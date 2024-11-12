import { requireAdmin } from '@/lib/auth';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  return <AnalyticsDashboard />;
} 