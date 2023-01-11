import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
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
          <Component {...pageProps} />
        </Layout>
      </SWRConfiguration>
    </SessionProvider>
  );
}
