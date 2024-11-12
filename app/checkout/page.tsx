import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CheckoutForm from '@/components/CheckoutForm';

export default async function CheckoutPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/checkout');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm user={session.user} />
    </div>
  );
} 