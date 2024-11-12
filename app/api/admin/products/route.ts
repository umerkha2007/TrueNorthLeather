import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  try {
    await requireAdmin();
    
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    
    const data = await request.json();
    const product = await prisma.product.create({
      data,
    });
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 400 }
    );
  }
} 