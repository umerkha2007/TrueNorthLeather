import { requireAdmin } from '@/lib/auth';
import UserManagement from '@/components/admin/UserManagement';

export default async function AdminUsersPage() {
  await requireAdmin();
  return <UserManagement />;
} 