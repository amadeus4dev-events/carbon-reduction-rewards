import "../styles/globals.css";
import type { AppProps } from "next/app";
import BaseLayout from "../components/BaseLayout";
import { TripsProvider, TripProvider } from "../services/trips";

const App = ({ Component, pageProps }: AppProps) => (
  <TripsProvider>
    <TripProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </TripProvider>
  </TripsProvider>
);

export default App;
