import webpush from 'web-push';

interface Env {
  JOB_STORE: KVNamespace;
  JOBTECH_API_URL: string;
  PUSH_PUBLIC_KEY: string;
  PUSH_PRIVATE_KEY: string;
  PUSH_EMAIL: string;
}

interface Job {
  id: string;
  headline: string;
  employer: {
    name: string;
  };
  workplace_address: {
    municipality: string;
  };
  description: {
    text: string;
  };
  application_details: {
    url: string;
  };
  publication_date: string;
}

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    try {
      // Configure web push
      webpush.setVapidDetails(
        `mailto:${env.PUSH_EMAIL}`,
        env.PUSH_PUBLIC_KEY,
        env.PUSH_PRIVATE_KEY
      );

      // Fetch new jobs from JobTech Dev API
      const response = await fetch(env.JOBTECH_API_URL);
      const jobs: Job[] = await response.json();

      // Get previously processed jobs
      const processedJobs = await env.JOB_STORE.get('processed_jobs', 'json') || [];
      const processedJobIds = new Set(processedJobs);

      // Filter new jobs
      const newJobs = jobs.filter(job => !processedJobIds.has(job.id));

      if (newJobs.length > 0) {
        // Store new job IDs
        await env.JOB_STORE.put(
          'processed_jobs',
          JSON.stringify([...processedJobIds, ...newJobs.map(job => job.id)])
        );

        // Send notifications for new jobs
        await sendNotifications(newJobs, env);

        // Auto-apply to matching jobs
        await autoApplyToJobs(newJobs);
      }
    } catch (error) {
      console.error('Error processing jobs:', error);
    }
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === '/api/jobs') {
      try {
        const response = await fetch(env.JOBTECH_API_URL);
        const jobs = await response.json();
        return new Response(JSON.stringify(jobs), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch jobs' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    if (url.pathname === '/api/notifications' && request.method === 'POST') {
      try {
        const subscription: PushSubscription = await request.json();
        
        // Store subscription in KV store
        const subscriptions = await env.JOB_STORE.get('push_subscriptions', 'json') || [];
        subscriptions.push(subscription);
        await env.JOB_STORE.put('push_subscriptions', JSON.stringify(subscriptions));

        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to store subscription' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Not found', { status: 404 });
  },
};

async function sendNotifications(jobs: Job[], env: Env) {
  try {
    const subscriptions: PushSubscription[] = await env.JOB_STORE.get('push_subscriptions', 'json') || [];
    
    for (const subscription of subscriptions) {
      for (const job of jobs) {
        try {
          await webpush.sendNotification(
            subscription,
            JSON.stringify({
              title: `New Job: ${job.headline}`,
              description: `${job.employer.name} is hiring in ${job.workplace_address.municipality}`,
              url: job.application_details.url
            })
          );
        } catch (error) {
          console.error('Error sending notification:', error);
          // If subscription is invalid, remove it
          if (error.statusCode === 410) {
            const currentSubscriptions = await env.JOB_STORE.get('push_subscriptions', 'json') || [];
            const updatedSubscriptions = currentSubscriptions.filter(
              (s: PushSubscription) => s.endpoint !== subscription.endpoint
            );
            await env.JOB_STORE.put('push_subscriptions', JSON.stringify(updatedSubscriptions));
          }
        }
      }
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

async function autoApplyToJobs(jobs: Job[]) {
  // TODO: Implement auto-apply logic
  console.log(`Auto-applying to ${jobs.length} new jobs`);
} 