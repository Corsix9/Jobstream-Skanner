'use client';

import { useState } from 'react';
import { JobList } from '@/components/JobList';
import { SearchFilters } from '@/components/SearchFilters';
import { Header } from '@/components/Header';

export default function Home() {
  const [filters, setFilters] = useState({
    keywords: '',
    location: '',
    autoApply: false,
    notificationsEnabled: true,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <SearchFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="lg:col-span-9">
          <JobList filters={filters} />
        </div>
      </div>
    </div>
  );
} 