import Layout from "@/components/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import SWRConfiguration from "@/components/SWRConfiguration";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfiguration>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfiguration>
  );
}
