import TabBar from '@/components/TabBar/TabBar';
import { ReactNode } from 'react';

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
