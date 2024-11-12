'use client';

import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/CartItem';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link 
          href="/products" 
          className="text-brown-600 hover:text-brown-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="w-full bg-brown-600 text-white py-3 px-4 rounded-md text-center block hover:bg-brown-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
} 