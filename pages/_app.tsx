import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import AppContextProvider from "../context/AppContext";
import ContextSetter from "../components/general/ContextSetter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <div className={poppins.className}>
    <AppContextProvider>
      <ContextSetter>
        <Component {...pageProps} />
      </ContextSetter>
    </AppContextProvider>
  </div>
);

export default App;
