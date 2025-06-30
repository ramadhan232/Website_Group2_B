'use client';

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LogoutButton from '@/components/student/LogoutButton';
import LiteracyList from '@/components/student/LiteracyList';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]


export default function StudentHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // tunggu dulu saat loading
    if (!session || session.user?.role !== 'student') {
      router.push('/student/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Pastikan session ada sebelum akses session.user
  const name = session?.user?.name;
  
  return (
    <div className="space-y-10">
      <LiteracyList />
    </div>
  );
}
