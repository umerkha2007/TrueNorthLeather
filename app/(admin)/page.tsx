import { requireAdmin } from '@/lib/auth';
import AdminDashboard from '@/components/AdminDashboard';

export default async function AdminPage() {
  await requireAdmin();

  return <AdminDashboard />;
} 