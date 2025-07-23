import { ComponentType } from 'react';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import InvestorDashboard from '@/pages/InvestorDashboard';
import TrackHoney from '@/pages/TrackHoney';
import Invest from '@/pages/Invest';
import Credits from '@/pages/Credits';
import Profile from '@/pages/Profile';
import Marketplace from '@/pages/Marketplace';
import WalletLogin from '@/pages/WalletLogin';
import RoleSelection from '@/pages/RoleSelection';
import LearnWallet from '@/pages/LearnWallet';
import ProfileSettings from '@/pages/ProfileSettings';
import NotFound from '@/pages/NotFound';

export interface RouteConfig {
  path: string;
  component: ComponentType;
  title: string;
  description?: string;
  protected?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Index,
    title: 'Home',
    description: 'Transform Kenyan beekeeping through blockchain technology'
  },
  {
    path: '/dashboard',
    component: Dashboard,
    title: 'Dashboard',
    description: 'Manage your hives and track honey production',
    protected: true
  },
  {
    path: '/investor-dashboard',
    component: InvestorDashboard,
    title: 'Investor Dashboard',
    description: 'Track your investments and returns',
    protected: true
  },
  {
    path: '/track',
    component: TrackHoney,
    title: 'Track Honey',
    description: 'Trace honey from hive to market'
  },
  {
    path: '/invest',
    component: Invest,
    title: 'Invest',
    description: 'Fund beekeeping projects with $BEE tokens'
  },
  {
    path: '/credits',
    component: Credits,
    title: 'Carbon Credits',
    description: 'Trade carbon credits from pollination services'
  },
  {
    path: '/marketplace',
    component: Marketplace,
    title: 'Marketplace',
    description: 'Buy and sell honey, equipment, and credits'
  },
  {
    path: '/wallet-login',
    component: WalletLogin,
    title: 'Connect Wallet',
    description: 'Connect your crypto wallet to access the platform'
  },
  {
    path: '/role-selection',
    component: RoleSelection,
    title: 'Choose Role',
    description: 'Select your role as beekeeper or investor'
  },
  {
    path: '/learn-wallet',
    component: LearnWallet,
    title: 'Learn Wallet',
    description: 'Learn how to create and use crypto wallets'
  },
  {
    path: '/profile',
    component: Profile,
    title: 'Profile',
    description: 'View your profile and activity',
    protected: true
  },
  {
    path: '/profile/settings',
    component: ProfileSettings,
    title: 'Profile Settings',
    description: 'Manage your profile and settings',
    protected: true
  },
  {
    path: '*',
    component: NotFound,
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist'
  }
];