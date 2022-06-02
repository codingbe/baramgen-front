import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { RecoilRoot } from "recoil";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
