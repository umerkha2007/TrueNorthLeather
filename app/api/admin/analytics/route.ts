import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();

    // Get date ranges
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    
    // Fetch analytics data
    const [
      orders,
      products,
      customers,
      revenue,
    ] = await Promise.all([
      getOrderAnalytics(thirtyDaysAgo, now),
      getProductAnalytics(thirtyDaysAgo, now),
      getCustomerAnalytics(thirtyDaysAgo, now),
      getRevenueAnalytics(thirtyDaysAgo, now),
    ]);

    return NextResponse.json({
      orders,
      products,
      customers,
      revenue,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
} 