import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    
    const data = await request.json();
    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        status: data.status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    
    // Send email notification about order status change
    await sendOrderStatusEmail(order);
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating order' },
      { status: 400 }
    );
  }
}

async function sendOrderStatusEmail(order: any) {
  // Implement email notification logic here
  // You can use services like SendGrid, AWS SES, etc.
  console.log(`Order ${order.id} status updated to ${order.status}`);
} 