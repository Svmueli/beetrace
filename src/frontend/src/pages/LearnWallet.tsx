import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Shield, Download, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const LearnWallet = () => {
  const walletGuides = [
    {
      name: 'Plug Wallet',
      description: 'The most popular wallet for Internet Computer',
      icon: Wallet,
      steps: [
        'Visit the Chrome Web Store',
        'Search for "Plug Wallet"',
        'Install the extension',
        'Create a new wallet or import existing one',
        'Secure your seed phrase'
      ],
      downloadUrl: 'https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm',
      websiteUrl: 'https://plugwallet.ooo/'
    },
    {
      name: 'Stoic Wallet',
      description: 'Secure and user-friendly ICP wallet',
      icon: Shield,
      steps: [
        'Visit Stoic Wallet website',
        'Click "Create Wallet"',
        'Generate your Internet Identity',
        'Secure your recovery phrase',
        'Add the wallet to your browser'
      ],
      downloadUrl: 'https://www.stoicwallet.com/',
      websiteUrl: 'https://www.stoicwallet.com/'
    },
    {
      name: 'NFID',
      description: 'Next-generation identity for Web3',
      icon: ExternalLink,
      steps: [
        'Go to NFID website',
        'Click "Get Started"',
        'Choose your authentication method',
        'Create your digital identity',
        'Connect to dApps seamlessly'
      ],
      downloadUrl: 'https://nfid.one/',
      websiteUrl: 'https://nfid.one/'
    }
  ];

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Learn How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Create a Wallet</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with crypto wallets for the Internet Computer ecosystem. Choose your preferred wallet and follow our step-by-step guides.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 mb-12">
            {walletGuides.map((wallet) => (
              <Card key={wallet.name} className="hover:shadow-lg transition-all border border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg">
                        <wallet.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{wallet.name}</CardTitle>
                        <CardDescription className="text-base">{wallet.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(wallet.websiteUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Website
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => window.open(wallet.downloadUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Get Wallet
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Setup Steps:</h4>
                    <ol className="space-y-2">
                      {wallet.steps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full text-sm font-medium flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border border-border bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Security Best Practices
              </h3>
              <div className="grid gap-4 md:grid-cols-2 text-left">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🔐 Secure Your Seed Phrase</h4>
                  <p className="text-muted-foreground text-sm">
                    Never share your seed phrase or private keys. Store them offline in a secure location.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">✅ Verify URLs</h4>
                  <p className="text-muted-foreground text-sm">
                    Always double-check website URLs and only download wallets from official sources.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🔄 Keep Backups</h4>
                  <p className="text-muted-foreground text-sm">
                    Create multiple secure backups of your recovery phrase in different locations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📱 Use 2FA</h4>
                  <p className="text-muted-foreground text-sm">
                    Enable two-factor authentication when available for additional security.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link to="/wallet-login">
              <Button className="font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
                Ready to Connect Your Wallet
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LearnWallet;