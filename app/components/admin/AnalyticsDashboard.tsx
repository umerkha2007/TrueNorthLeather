'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { formatPrice } from '@/lib/utils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    revenue: {
      daily: [],
      monthly: [],
    },
    orders: {
      total: 0,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
    },
    products: {
      topSelling: [],
      categories: [],
    },
    customers: {
      new: 0,
      total: 0,
      retention: 0,
    },
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const response = await fetch('/api/admin/analytics');
    const data = await response.json();
    setAnalytics(data);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Add your analytics components here */}
      </div>
    </div>
  );
} 