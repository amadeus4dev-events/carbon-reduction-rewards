import "../styles/globals.css";
import type { AppProps } from "next/app";
import BaseLayout from "../components/BaseLayout";
import { TripProvider } from "../services/trips";

const App = ({ Component, pageProps }: AppProps) => (
  <TripProvider>
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  </TripProvider>
);

export default App;
