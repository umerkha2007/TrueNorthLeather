import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db';
// import { Product } from '@/types';

async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      {/* Filters */}
      <div className="mb-8">
        <select className="border rounded-md p-2">
          <option value="">All Categories</option>
          <option value="wallets">Wallets</option>
          <option value="bags">Bags</option>
          <option value="belts">Belts</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 