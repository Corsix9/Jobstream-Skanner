'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition, Switch } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notificationPreferences: NotificationPreferences;
  onPreferencesChange: (preferences: NotificationPreferences) => void;
}

export interface NotificationPreferences {
  jobAlerts: boolean;
  applicationUpdates: boolean;
  dailyDigest: boolean;
  soundEnabled: boolean;
  groupNotifications: boolean;
  notificationFrequency: 'immediate' | 'hourly' | 'daily';
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

export function SettingsPanel({
  isOpen,
  onClose,
  notificationPreferences,
  onPreferencesChange,
}: SettingsPanelProps) {
  const [preferences, setPreferences] = useState(notificationPreferences);

  const handleChange = (key: keyof NotificationPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    onPreferencesChange(newPreferences);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Notification Settings
                    </Dialog.Title>

                    <div className="mt-6 space-y-6">
                      {/* Notification Types */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-900">Notification Types</h4>
                        <div className="space-y-3">
                          <SwitchItem
                            label="Job Alerts"
                            description="Get notified about new matching jobs"
                            enabled={preferences.jobAlerts}
                            onChange={(value) => handleChange('jobAlerts', value)}
                          />
                          <SwitchItem
                            label="Application Updates"
                            description="Receive updates about your job applications"
                            enabled={preferences.applicationUpdates}
                            onChange={(value) => handleChange('applicationUpdates', value)}
                          />
                          <SwitchItem
                            label="Daily Digest"
                            description="Receive a summary of new jobs daily"
                            enabled={preferences.dailyDigest}
                            onChange={(value) => handleChange('dailyDigest', value)}
                          />
                        </div>
                      </div>

                      {/* Notification Behavior */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-900">Notification Behavior</h4>
                        <div className="space-y-3">
                          <SwitchItem
                            label="Sound Enabled"
                            description="Play a sound when notifications arrive"
                            enabled={preferences.soundEnabled}
                            onChange={(value) => handleChange('soundEnabled', value)}
                          />
                          <SwitchItem
                            label="Group Notifications"
                            description="Combine multiple notifications into a single group"
                            enabled={preferences.groupNotifications}
                            onChange={(value) => handleChange('groupNotifications', value)}
                          />
                        </div>
                      </div>

                      {/* Notification Frequency */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-900">Notification Frequency</h4>
                        <select
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={preferences.notificationFrequency}
                          onChange={(e) => handleChange('notificationFrequency', e.target.value)}
                        >
                          <option value="immediate">Immediate</option>
                          <option value="hourly">Hourly Digest</option>
                          <option value="daily">Daily Digest</option>
                        </select>
                      </div>

                      {/* Quiet Hours */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Quiet Hours</h4>
                          <Switch
                            checked={preferences.quietHoursEnabled}
                            onChange={(value) => handleChange('quietHoursEnabled', value)}
                            className={`${
                              preferences.quietHoursEnabled ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                          >
                            <span
                              className={`${
                                preferences.quietHoursEnabled ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                          </Switch>
                        </div>
                        {preferences.quietHoursEnabled && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Start Time</label>
                              <input
                                type="time"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={preferences.quietHoursStart}
                                onChange={(e) => handleChange('quietHoursStart', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">End Time</label>
                              <input
                                type="time"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={preferences.quietHoursEnd}
                                onChange={(e) => handleChange('quietHoursEnd', e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function SwitchItem({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
} 