'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    }
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              href="/admin/products/new"
              className="block w-full bg-brown-600 text-white text-center py-2 rounded-md hover:bg-brown-700"
            >
              Add New Product
            </Link>
            <Link
              href="/admin/orders"
              className="block w-full bg-brown-600 text-white text-center py-2 rounded-md hover:bg-brown-700"
            >
              View Orders
            </Link>
            <Link
              href="/admin/users"
              className="block w-full bg-brown-600 text-white text-center py-2 rounded-md hover:bg-brown-700"
            >
              Manage Users
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {/* Add recent activity feed here */}
        </div>
      </div>
    </div>
  );
} 