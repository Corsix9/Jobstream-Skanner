import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export function Header() {
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
            <button
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              onClick={() => {/* Toggle notifications */}}
            >
              <BellIcon className="h-6 w-6" />
            </button>
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