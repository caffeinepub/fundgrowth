import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import BondsPage from './pages/BondsPage';
import BondDetailPage from './pages/BondDetailPage';
import InvestPage from './pages/InvestPage';
import DashboardPage from './pages/DashboardPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

const rootRoute = createRootRoute({
  component: AppShell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const bondsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bonds',
  component: BondsPage,
});

const bondDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bonds/$bondId',
  component: BondDetailPage,
});

const investRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invest/$bondId',
  component: InvestPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-it-works',
  component: HowItWorksPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FAQPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  bondsRoute,
  bondDetailRoute,
  investRoute,
  dashboardRoute,
  howItWorksRoute,
  faqRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
