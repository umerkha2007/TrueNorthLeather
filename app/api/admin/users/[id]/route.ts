import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    
    const data = await request.json();
    const { password, ...rest } = data;
    
    const updateData = {
      ...rest,
      ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
    };
    
    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating user' },
      { status: 400 }
    );
  }
} 