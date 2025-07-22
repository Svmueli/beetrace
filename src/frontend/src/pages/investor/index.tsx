import Head from 'next/head';
import { useWallet } from '../../components/WalletContext';

export default function InvestorDashboard() {
  const { isAuthenticated, principal, loading } = useWallet();

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!isAuthenticated) return <div className="text-center py-20 text-red-500">Please connect your wallet to access the Investor Dashboard.</div>;

  return (
    <div className="min-h-[calc(100vh-150px)] p-8 bg-creamy-ivory">
      <Head>
        <title>BeeTrace - Investor Dashboard</title>
      </Head>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-sky-blue mb-8">Investor Dashboard</h1>
        <p className="text-charcoal-grey text-lg mb-4">Welcome, Investor! Your Principal ID: {principal?.toText()}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Section 1: Explore Projects */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-light-grey">
            <h2 className="font-heading text-2xl font-semibold text-deep-amber mb-4">Explore Hive Projects</h2>
            <p className="text-dark-grey mb-4">Browse and invest in sustainable hive funding initiatives.</p>
            <button className="btn-primary">View All Projects</button>
          </div>

          {/* Section 2: My Investments */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-light-grey">
            <h2 className="font-heading text-2xl font-semibold text-deep-amber mb-4">My Investments</h2>
            <p className="text-dark-grey mb-4">Track your investments in various hive projects.</p>
            <button className="btn-primary">My Portfolio</button>
          </div>

          {/* Section 3: Credit Marketplace */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-light-grey">
            <h2 className="font-heading text-2xl font-semibold text-deep-amber mb-4">Credit Marketplace</h2>
            <p className="text-dark-grey mb-4">Buy pollination and carbon credits from beekeepers.</p>
            <button className="btn-primary">Browse Credits</button>
          </div>
        </div>
      </div>
    </div>
  );
}