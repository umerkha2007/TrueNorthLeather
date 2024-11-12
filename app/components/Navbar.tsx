'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (session) {
        const response = await fetch('/api/auth/check-admin');
        const { isAdmin } = await response.json();
        setIsAdmin(isAdmin);
      }
    }
    checkAdmin();
  }, [session]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl">
            TrueNorth Leather
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="hover:text-brown-600">
              Products
            </Link>
            <Link href="/about" className="hover:text-brown-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-brown-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="hover:text-brown-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            
            {session ? (
              <>
                <Link href="/account" className="hover:text-brown-600">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-brown-600"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="hover:text-brown-600"
              >
                Sign In
              </Link>
            )}
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className="text-brown-600 hover:text-brown-700"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 