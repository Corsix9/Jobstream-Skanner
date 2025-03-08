'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  applicationUrl: string;
  publishedAt: string;
}

interface JobListProps {
  filters: {
    keywords: string;
    location: string;
    autoApply: boolean;
    notificationsEnabled: boolean;
  };
}

export function JobList({ filters }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to JobTech Dev API
        const response = await fetch('https://jobstream.api.jobtechdev.se/stream');
        const data = await response.json();
        
        // Transform the data to match our Job interface
        const transformedJobs = data.map((job: any) => ({
          id: job.id,
          title: job.headline,
          company: job.employer.name,
          location: job.workplace_address.municipality,
          description: job.description.text,
          applicationUrl: job.application_details.url,
          publishedAt: job.publication_date
        }));

        setJobs(transformedJobs);

        if (filters.notificationsEnabled) {
          // Show notification for new jobs
          toast.success(`Found ${transformedJobs.length} new jobs matching your criteria!`);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    // Set up polling interval
    const interval = setInterval(fetchJobs, 300000); // Poll every 5 minutes

    return () => clearInterval(interval);
  }, [filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
            </div>
            <div className="flex space-x-2">
              {filters.autoApply && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Auto Apply
                </span>
              )}
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                {new Date(job.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <p className="mt-2 text-gray-600 line-clamp-3">{job.description}</p>
          
          <div className="mt-4 flex space-x-3">
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Now
            </a>
            <button
              onClick={() => {/* Save job logic */}}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 