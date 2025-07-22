import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // For navigation
import { useWallet } from './WalletContext'; // Import the wallet context
import { Principal } from '@dfinity/agent'; // For Principal type

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "BeeTrace", description = "Trace honey, invest in hives, trade pollination credits on the Internet Computer." }) => {
  const { isAuthenticated, principal, logout, loading } = useWallet();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" /> {/* Placeholder, we'll add this later */}
      </Head>

      <div className="min-h-screen flex flex-col bg-creamy-ivory font-sans">
        {/* Header */}
        <header className="w-full bg-pure-white shadow-sm py-4 px-6 md:px-12 flex items-center justify-between z-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* Placeholder for Logo */}
            <img src="/images/bee-logo.svg" alt="BeeTrace Logo" className="h-8 w-8" /> {/* We'll create this */}
            <span className="font-heading text-2xl font-bold text-golden-honey">BeeTrace</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-charcoal-grey hover:text-deep-amber font-semibold transition-colors">Home</Link>
            <Link href="/beekeeper" className="text-charcoal-grey hover:text-deep-amber font-semibold transition-colors">Beekeeper</Link>
            <Link href="/investor" className="text-charcoal-grey hover:text-deep-amber font-semibold transition-colors">Investor</Link>
            <Link href="/marketplace" className="text-charcoal-grey hover:text-deep-amber font-semibold transition-colors">Marketplace</Link>
            {/* <Link href="/about" className="text-charcoal-grey hover:text-deep-amber font-semibold transition-colors">About</Link> */}
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-dark-grey text-sm">Loading...</span>
            ) : isAuthenticated && principal ? (
              <div className="flex items-center space-x-2 text-charcoal-grey">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-medium hidden sm:inline">Connected:</span>
                <span className="text-sm font-mono text-dark-grey">
                  {principal.toText().slice(0, 6)}...{principal.toText().slice(-4)}
                </span>
                <button
                  onClick={logout}
                  className="ml-2 text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Will be handled by Connect button on landing page, or a global modal later
              <Link href="#" onClick={(e) => { e.preventDefault(); /* Trigger connect modal/page */ }}
                className="btn-primary py-2 px-4 text-sm"
              >
                Connect Wallet
              </Link>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full bg-dark-grey text-pure-white py-8 px-6 md:px-12 text-center text-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-heading font-semibold text-golden-honey mb-2">BeeTrace</h3>
                <p className="text-light-grey max-w-sm">Revolutionizing honey traceability and sustainable investments on the Internet Computer.</p>
              </div>
              <div className="flex space-x-8">
                <div>
                  <h4 className="font-semibold text-pure-white mb-2">Quick Links</h4>
                  <ul>
                    <li><Link href="/beekeeper" className="text-light-grey hover:text-golden-honey transition-colors">Beekeeper Dashboard</Link></li>
                    <li><Link href="/investor" className="text-light-grey hover:text-golden-honey transition-colors">Investor Dashboard</Link></li>
                    <li><Link href="/marketplace" className="text-light-grey hover:text-golden-honey transition-colors">Credit Marketplace</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-pure-white mb-2">Support</h4>
                  <ul>
                    <li><Link href="/faq" className="text-light-grey hover:text-golden-honey transition-colors">FAQ</Link></li>
                    <li><Link href="/contact" className="text-light-grey hover:text-golden-honey transition-colors">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6 text-light-grey">
              &copy; {new Date().getFullYear()} BeeTrace. All rights reserved. | Built on the Internet Computer.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;