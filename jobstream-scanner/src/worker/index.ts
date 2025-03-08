interface Env {
  JOB_STORE: KVNamespace;
  JOBTECH_API_URL: string;
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

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    try {
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
        await sendNotifications(newJobs);

        // Auto-apply to matching jobs
        await autoApplyToJobs(newJobs);
      }
    } catch (error) {
      console.error('Error processing jobs:', error);
    }
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Handle API requests from the frontend
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

    return new Response('Not found', { status: 404 });
  },
};

async function sendNotifications(jobs: Job[]) {
  // TODO: Implement push notification logic
  console.log(`Sending notifications for ${jobs.length} new jobs`);
}

async function autoApplyToJobs(jobs: Job[]) {
  // TODO: Implement auto-apply logic
  console.log(`Auto-applying to ${jobs.length} new jobs`);
} 