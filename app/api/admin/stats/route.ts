import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  try {
    await requireAdmin();

    const [totalOrders, totalProducts, totalUsers] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
    ]);

    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
} 