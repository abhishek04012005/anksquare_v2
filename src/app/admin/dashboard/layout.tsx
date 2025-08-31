import { ReactNode } from 'react';
import AdminNavbar from '@/admin/adminnavbar/AdminNavbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <AdminNavbar />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
