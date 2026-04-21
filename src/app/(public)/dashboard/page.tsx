import DashboardClient from './DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Adventures Wheel',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
