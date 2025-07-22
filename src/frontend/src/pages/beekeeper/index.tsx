import Head from 'next/head';
import { useWallet } from '../../components/WalletContext';

export default function BeekeeperDashboard() {
  const { isAuthenticated, principal, loading } = useWallet();

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!isAuthenticated) return <div className="text-center py-20 text-red-500">Please connect your wallet to access the Beekeeper Dashboard.</div>;

  return (
    <div className="min-h-[calc(100vh-150px)] p-8 bg-creamy-ivory"> {/* Adjust min-height based on header/footer */}
      <Head>
        <title>BeeTrace - Beekeeper Dashboard</title>
      </Head>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-4xl font-bold text-olive-green mb-8">Beekeeper Dashboard</h1>
        <p className="text-charcoal-grey text-lg mb-4">Welcome, Beekeeper! Your Principal ID: {principal?.toText()}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Section 1: Mint Honey Batches */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-light-grey">
            <h2 className="font-heading text-2xl font-semibold text-deep-amber mb-4">My Honey Batches</h2>
            <p className="text-dark-grey mb-4">View and mint new traceable honey batches.</p>
            <button className="btn-primary">Mint New Batch</button>
          </div>

          {/* Section 2: Pollination Credits */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-light-grey">
            <h2 className="font-heading text-2xl font-semibold text-deep-amber mb-4">Pollination Credits</h2>
            <p className="text-dark-grey mb-4">Mint and list your pollination credits on the marketplace.</p>
            <button className="btn-primary">Manage Credits</button>
          </div>

          {/* Section 3: Hive Projects */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-light-grey">
            <h2 className="font-heading text-2xl font-semibold text-deep-amber mb-4">My Hive Projects</h2>
            <p className="text-dark-grey mb-4">Manage your sustainable hive funding projects.</p>
            <button className="btn-primary">View Projects</button>
          </div>
        </div>
      </div>
    </div>
  );
}