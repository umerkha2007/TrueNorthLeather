'use client';

import { useState } from 'react';
import { User } from '@/types';

interface UserFormProps {
  user: User | null;
  onClose: () => void;
  onSubmit: () => void;
}

export default function UserForm({ user, onClose, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'USER',
    password: '', // Only used for new users
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const url = user
      ? `/api/admin/users/${user.id}`
      : '/api/admin/users';
    
    const method = user ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    onSubmit();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">User Form</h2>
        {/* Add your form elements here */}
      </div>
    </div>
  );
} 