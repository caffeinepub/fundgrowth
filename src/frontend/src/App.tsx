import { RouterProvider, createRouter, createRoute, createRootRoute, NotFoundRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import BondsPage from './pages/BondsPage';
import BondDetailPage from './pages/BondDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const rootRoute = createRootRoute({
  component: AppShell,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  howItWorksRoute,
  faqRoute,
  contactRoute,
  bondsRoute,
  bondDetailRoute,
]);

const router = createRouter({ 
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

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
