import "../styles/globals.css";
import type { AppProps } from "next/app";
import BaseLayout from "../components/BaseLayout";

const App = ({ Component, pageProps }: AppProps) => (
  <BaseLayout>
    <Component {...pageProps} />
  </BaseLayout>
);

export default App;
