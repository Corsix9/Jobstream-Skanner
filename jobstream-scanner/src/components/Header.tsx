'use client';

import { BellIcon, BellSlashIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '@/hooks/useNotifications';

export function Header() {
  const { subscription, permission, subscribe, unsubscribe, isSupported } = useNotifications();

  const handleNotificationToggle = async () => {
    if (subscription) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  };

  return (
    <header className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">JobStream Scanner</h1>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Live
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isSupported && (
              <button
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative"
                onClick={handleNotificationToggle}
                title={subscription ? 'Disable notifications' : 'Enable notifications'}
              >
                {subscription ? (
                  <BellIcon className="h-6 w-6" />
                ) : (
                  <BellSlashIcon className="h-6 w-6" />
                )}
                {permission === 'default' && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></span>
                )}
              </button>
            )}
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              onClick={() => {/* Open settings */}}
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 