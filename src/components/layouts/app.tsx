import { SUPER_ADMIN } from '@/utils/constants';
import dynamic from 'next/dynamic';
import AdminLayout from './admin/index';
import OwnerLayout from './owner';
// raise an error in production
// const AdminLayout = dynamic(() => import('@/components/layouts/admin'));
// const OwnerLayout = dynamic(() => import('@/components/layouts/owner'));

export default function AppLayout({
  userPermissions,
  ...props
}: {
  userPermissions: string[];
}) {
  if (userPermissions?.includes(SUPER_ADMIN)) {
    return <AdminLayout {...props} />;
  }
  return <OwnerLayout {...props} />;
}
