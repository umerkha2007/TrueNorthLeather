import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

async function getOrders(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function AccountPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const orders = await getOrders(session.user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <p className="mt-1">{session.user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="mt-1">{session.user.email}</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                  {/* Add your order details here */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 