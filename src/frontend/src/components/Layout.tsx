import { ReactNode } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}

const Layout = ({ 
  children, 
  showNavbar = true, 
  showFooter = true, 
  className = "min-h-screen bg-gradient-to-b from-background to-accent/20" 
}: LayoutProps) => {
  return (
    <div className={className}>
      <Toaster />
      <Sonner />
      {showNavbar && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;