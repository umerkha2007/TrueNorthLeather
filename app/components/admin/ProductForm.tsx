'use client';

import { useState } from 'react';
import { Product } from '@/types';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ProductForm({ product, onClose, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    imageUrl: product?.imageUrl || '',
    stock: product?.stock || 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const url = product
      ? `/api/admin/products/${product.id}`
      : '/api/admin/products';
    
    const method = product ? 'PUT' : 'POST';

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
        <h2 className="text-2xl font-bold mb-6">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
} 