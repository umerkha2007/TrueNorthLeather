import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import AddToCartButton from '@/components/AddToCartButton';
import { formatPrice } from '@/lib/utils';

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) notFound();
  return product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-4">{formatPrice(product.price)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Details</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Handcrafted in Canada</li>
              <li>Premium full-grain leather</li>
              <li>Lifetime warranty</li>
            </ul>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
} 