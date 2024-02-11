'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to movies page
    router.replace('/movies');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-gray-600">Loading movies...</p>
      </div>
    </div>
  );
}
