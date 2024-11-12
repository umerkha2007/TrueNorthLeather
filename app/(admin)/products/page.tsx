import { requireAdmin } from '@/lib/auth';
import ProductManagement from '@/components/admin/ProductManagement';

export default async function AdminProductsPage() {
  await requireAdmin();
  return <ProductManagement />;
} 