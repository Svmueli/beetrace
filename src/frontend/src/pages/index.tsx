import { useWallet } from '../components/WalletContext';
import Link from 'next/link';

export default function LandingPage() {
  const { login, isAuthenticated, principal, loading } = useWallet();

  const handleConnectWallet = async () => {
    if (!isAuthenticated) {
      await login();
    } else {
      // If already connected, maybe navigate to a dashboard?
      // For now, it just shows 'Wallet Connected'
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Subtle honeycomb background across the entire page */}
      <div className="absolute inset-0 bg-repeat bg-center opacity-5" style={{ backgroundImage: "url('/images/honeycomb-pattern-light.svg')" }}></div>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-creamy-ivory to-pure-white">
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 z-0" style={{ backgroundImage: "url('/images/hero-honey-hive.jpg')" }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-golden-honey mb-4 drop-shadow-md">
            Trace Nature&apos;s Sweetest Gold
          </h1>
          <p className="font-sans text-xl md:text-2xl text-charcoal-grey mb-8 leading-relaxed">
            Unlock unparalleled trust in honey traceability. Invest in sustainable beekeeping and trade unique pollination credits on the Internet Computer.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handleConnectWallet}
              className="btn-primary text-lg"
              disabled={loading || isAuthenticated}
            >
              {loading ? 'Connecting...' : (isAuthenticated ? 'Wallet Connected' : 'Connect Wallet')}
            </button>
            <Link href="/marketplace" className="btn-secondary text-lg">
              Explore Credits
            </Link>
          </div>
          {isAuthenticated && principal && (
            <p className="mt-4 text-sm text-dark-grey flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="font-medium">Connected as:</span> {principal.toText().slice(0, 8)}...
            </p>
          )}
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-gradient-to-r from-creamy-ivory to-pure-white relative z-10">
        <h2 className="font-heading text-4xl font-bold text-olive-green text-center mb-12">Why BeeTrace?</h2>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Verified Quality */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-light-grey flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
            {/* Placeholder Icon: Honey Drop */}
            <img src="/icons/honey-drop.svg" alt="Honey Quality Icon" className="h-16 w-16 mb-4 text-golden-honey" />
            <h3 className="font-heading text-2xl font-semibold text-deep-amber mb-3">Verified Quality</h3>
            <p className="text-dark-grey">Scan a honey batch to instantly view its origin, beekeeper, and quality certifications, ensuring complete transparency from hive to table.</p>
          </div>
          {/* Card 2: Sustainable Impact */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-light-grey flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
            {/* Placeholder Icon: Leaf / Growth */}
            <img src="/icons/leaf-growth.svg" alt="Sustainable Impact Icon" className="h-16 w-16 mb-4 text-olive-green" />
            <h3 className="font-heading text-2xl font-semibold text-deep-amber mb-3">Sustainable Impact</h3>
            <p className="text-dark-grey">Support sustainable beekeeping practices and contribute to vital pollination efforts by investing directly in hive projects.</p>
          </div>
          {/* Card 3: Transparent Marketplace */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-light-grey flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
            {/* Placeholder Icon: Blockchain / Coins */}
            <img src="/icons/blockchain-coins.svg" alt="Transparent Marketplace Icon" className="h-16 w-16 mb-4 text-sky-blue" />
            <h3 className="font-heading text-2xl font-semibold text-deep-amber mb-3">Transparent Marketplace</h3>
            <p className="text-dark-grey">Buy and sell tokenized pollination credits and carbon offsets on a secure, immutable blockchain marketplace.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-terra-cotta-brown relative z-10 text-pure-white">
        <h2 className="font-heading text-4xl font-bold text-golden-honey text-center mb-12">How It Works</h2>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-pure-white p-4 rounded-full shadow-lg mb-4">
              <img src="/icons/beekeeper.svg" alt="Beekeeper Icon" className="h-12 w-12 text-olive-green" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-golden-honey mb-2">1. Beekeepers Log Batches & Pollination</h3>
            <p className="text-light-grey">Beekeepers register their honey batches and record pollination activities, minting unique NFTs on the blockchain.</p>
          </div>
          {/* Arrow/Connector (Optional, can be done with CSS/SVG) */}
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center md:mt-16">
            <div className="bg-pure-white p-4 rounded-full shadow-lg mb-4">
              <img src="/icons/nft-credit.svg" alt="NFT Icon" className="h-12 w-12 text-sky-blue" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-golden-honey mb-2">2. Credits are Tokenized & Listed</h3>
            <p className="text-light-grey">Pollination and carbon credits, along with hive investment opportunities, are tokenized as NFTs and listed on the marketplace.</p>
          </div>
          {/* Arrow/Connector */}
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-pure-white p-4 rounded-full shadow-lg mb-4">
              <img src="/icons/scan-verify.svg" alt="Scan Icon" className="h-12 w-12 text-deep-amber" />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-golden-honey mb-2">3. Buyers Verify & Invest</h3>
            <p className="text-light-grey">Consumers scan QR codes to verify honey, while investors purchase credits and support projects, driving sustainability.</p>
          </div>
        </div>
      </section>
    </div>
  );
}