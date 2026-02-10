import { Outlet } from '@tanstack/react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ProfileSetupModal from '../auth/ProfileSetupModal';

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ProfileSetupModal />
    </div>
  );
}
