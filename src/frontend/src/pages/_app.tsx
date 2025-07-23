
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WalletProvider } from '../../components/WalletContext'; // Import your WalletProvider
// Make sure your global CSS is imported
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BeeTrace - Nature&apos;s Sweetest Gold</title> {/* Fixed apostrophe here */}
        <meta name="description" content="Trace honey, invest in hives, trade pollination credits on the Internet Computer." />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* Wrap the Component with WalletProvider */}
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </>
  );
}