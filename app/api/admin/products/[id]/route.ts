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
    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    
    await prisma.product.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 400 }
    );
  }
} 