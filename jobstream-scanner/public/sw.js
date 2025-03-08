// Cache for storing notifications that need to be grouped
let notificationCache = new Map();
let groupTimeout;

self.addEventListener('push', event => {
  const data = event.data.json();
  
  if (data.preferences?.groupNotifications) {
    // Add to notification cache
    const jobType = data.jobType || 'general';
    if (!notificationCache.has(jobType)) {
      notificationCache.set(jobType, []);
    }
    notificationCache.get(jobType).push(data);

    // Clear existing timeout
    if (groupTimeout) {
      clearTimeout(groupTimeout);
    }

    // Set new timeout to show grouped notifications
    groupTimeout = setTimeout(() => {
      showGroupedNotifications();
    }, 5000); // Wait 5 seconds to group notifications

    // Ensure the event doesn't complete before the timeout
    event.waitUntil(Promise.resolve());
  } else {
    // Show individual notification immediately
    event.waitUntil(showNotification(data));
  }
});

async function showGroupedNotifications() {
  for (const [type, notifications] of notificationCache.entries()) {
    if (notifications.length > 0) {
      const title = `${notifications.length} New ${type} Jobs`;
      const options = {
        body: notifications.map(n => n.description).join('\n'),
        icon: '/icon.png',
        badge: '/badge.png',
        tag: `group-${type}`,
        data: {
          type: 'group',
          notifications: notifications,
          timestamp: new Date().getTime()
        },
        actions: [
          {
            action: 'view-all',
            title: 'View All'
          }
        ]
      };

      if (notifications[0].preferences?.soundEnabled) {
        options.silent = false;
        options.sound = '/notification-sound.mp3';
      } else {
        options.silent = true;
      }

      await self.registration.showNotification(title, options);
    }
  }

  // Clear the cache after showing notifications
  notificationCache.clear();
}

async function showNotification(data) {
  const options = {
    body: data.description,
    icon: '/icon.png',
    badge: '/badge.png',
    tag: data.id,
    data: {
      url: data.url,
      timestamp: new Date().getTime()
    },
    actions: [
      {
        action: 'apply',
        title: 'Apply Now'
      },
      {
        action: 'save',
        title: 'Save'
      }
    ]
  };

  if (data.preferences?.soundEnabled) {
    options.silent = false;
    options.sound = '/notification-sound.mp3';
  } else {
    options.silent = true;
  }

  return self.registration.showNotification(data.title, options);
}

self.addEventListener('notificationclick', event => {
  event.notification.close();

  let promise;

  if (event.notification.data.type === 'group') {
    // Handle group notification click
    if (event.action === 'view-all') {
      promise = clients.openWindow('/jobs');
    } else {
      // Open the first job in the group
      const firstJob = event.notification.data.notifications[0];
      promise = clients.openWindow(firstJob.url);
    }
  } else {
    // Handle individual notification click
    if (event.action === 'apply') {
      promise = clients.openWindow(event.notification.data.url);
    } else if (event.action === 'save') {
      // TODO: Implement save job functionality
      promise = clients.openWindow('/saved-jobs');
    } else {
      promise = clients.openWindow(event.notification.data.url);
    }
  }

  event.waitUntil(promise);
}); 