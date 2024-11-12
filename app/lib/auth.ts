import { getServerSession } from 'next-auth';
import prisma from './db';
import { redirect } from 'next/navigation';

export async function isAdmin() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  return user?.role === 'ADMIN';
}

export async function requireAdmin() {
  const isUserAdmin = await isAdmin();
  
  if (!isUserAdmin) {
    redirect('/');
  }
} 