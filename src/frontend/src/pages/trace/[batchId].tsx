import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useWallet } from '../../components/WalletContext';
import { Principal } from '@dfinity/agent';

// Assuming HoneyBatch is defined or can be imported from your backend declarations
// For now, let's redefine it here if not imported
interface HoneyBatch {
    id: bigint;
    beekeeper_id: Principal;
    location: string;
    quality: string;
    timestamp: bigint;
}

export default function TraceBatchPage() {
  const router = useRouter();
  const { batchId } = router.query; // Get the dynamic part of the URL
  const { backendActor, loading: walletLoading } = useWallet();
  const [batchDetails, setBatchDetails] = useState<HoneyBatch | null>(null);
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchDetails = async () => {
      if (!batchId || !backendActor || walletLoading) return;

      setFetchStatus('loading');
      setErrorMessage('');
      try {
        // Ensure batchId is converted to a BigInt if your backend expects it as bigint
        const idAsBigInt = BigInt(batchId as string);
        // Type assertion for backendActor is temporary, best to ensure proper type inference
        const result = await (backendActor as any).get_honey_batch_details(idAsBigInt);

        if (result) {
          setBatchDetails(result);
          setFetchStatus('success');
        } else {
          setBatchDetails(null);
          setFetchStatus('error');
          setErrorMessage('Honey batch not found.');
        }
      } catch (e: unknown) { // Changed 'any' to 'unknown'
        console.error("Error fetching honey batch details:", e);
        setBatchDetails(null);
        setFetchStatus('error');
        // Safely check for 'message' property
        setErrorMessage(`Failed to fetch details: ${e instanceof Error ? e.message : String(e)}`);
      }
    };

    fetchDetails();
  }, [batchId, backendActor, walletLoading]); // Re-run effect if batchId or actor changes

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000); // Convert bigint seconds to JS ms
    return date.toLocaleString();
  };

  return (
    <div className="min-h-[calc(100vh-150px)] p-8 bg-creamy-ivory">
      <Head>
        <title>BeeTrace - Batch {batchId || 'Details'}</title>
      </Head>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-light-grey">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-golden-honey mb-6 text-center">
          Honey Batch Details
        </h1>

        {fetchStatus === 'loading' && (
          <div className="text-center text-deep-amber text-lg py-10">Loading batch details...</div>
        )}
        {fetchStatus === 'error' && (
          <div className="text-center text-red-600 text-lg py-10">
            Error: {errorMessage || 'Could not load honey batch details.'}
          </div>
        )}
        {fetchStatus === 'success' && batchDetails && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-dark-grey">Batch ID:</span>
              <span className="font-mono text-charcoal-grey text-lg">{batchDetails.id.toString()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-dark-grey">Beekeeper:</span>
              <span className="font-mono text-charcoal-grey text-lg">{batchDetails.beekeeper_id.toText()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-dark-grey">Location:</span>
              <span className="text-charcoal-grey text-lg">{batchDetails.location}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-dark-grey">Quality:</span>
              <span className="text-charcoal-grey text-lg">{batchDetails.quality}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-dark-grey">Mint Date:</span>
              <span className="text-charcoal-grey text-lg">{formatTimestamp(batchDetails.timestamp)}</span>
            </div>
            {/* QR Code Placeholder */}
            <div className="text-center mt-8">
              <img src="/images/qr-code-placeholder.png" alt="QR Code" className="mx-auto w-32 h-32 border border-light-grey p-2 rounded-md" />
              <p className="text-sm text-dark-grey mt-2">Scan this QR to verify on chain.</p>
            </div>
          </div>
        )}
        {fetchStatus === 'success' && !batchDetails && (
             <div className="text-center text-dark-grey text-lg py-10">No details found for batch ID {batchId}.</div>
        )}
      </div>
    </div>
  );
}