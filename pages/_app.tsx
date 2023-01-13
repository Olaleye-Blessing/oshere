import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import SWRConfiguration from "@/components/SWRConfiguration";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfiguration>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </SWRConfiguration>
    </SessionProvider>
  );
}
