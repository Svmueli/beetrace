
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const WalletLogin = () => {
  const [connecting, setConnecting] = useState(false);

  const handleWalletConnect = (walletType: string) => {
    setConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setConnecting(false);
      
      // Check if user already has a role selected
      const existingRole = localStorage.getItem('userRole');
      
      if (existingRole) {
        // User already has a role, redirect to appropriate dashboard
        localStorage.setItem('walletConnected', 'true');
        if (existingRole === 'beekeeper') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/investor-dashboard';
        }
      } else {
        // New user, redirect to role selection
        window.location.href = '/role-selection';
      }
    }, 2000);
  };

  return (
    <Layout>
      
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Connect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Wallet</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose your preferred wallet to access the BeeTrace platform
            </p>
          </div>

          <div className="space-y-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleWalletConnect('plug')}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Plug Wallet</CardTitle>
                    <CardDescription>Connect with Plug wallet for Internet Computer</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleWalletConnect('stoic')}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Stoic Wallet</CardTitle>
                    <CardDescription>Secure wallet solution for ICP ecosystem</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleWalletConnect('nfid')}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>NFID</CardTitle>
                    <CardDescription>Next-generation identity for Web3</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {connecting && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Connecting to wallet...</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Don't have a wallet?{' '}
              <Link to="/learn-wallet" className="text-primary hover:text-primary/80 font-medium">
                Learn how to create one
              </Link>
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default WalletLogin;
