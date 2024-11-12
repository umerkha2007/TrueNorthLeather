'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminStatus() {
      if (status === 'authenticated') {
        const response = await fetch('/api/auth/check-admin');
        const { isAdmin } = await response.json();
        setIsAdmin(isAdmin);
        
        if (!isAdmin) {
          router.push('/');
        }
      }
    }

    checkAdminStatus();
  }, [status, router]);

  if (status === 'loading' || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
      </div>
    );
  }

  return <>{children}</>;
} 