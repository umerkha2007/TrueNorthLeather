import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
            width={300}
            height={300}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 