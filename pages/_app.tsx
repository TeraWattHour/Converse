import axios from "axios";
import App from "next/app";
import { createContext } from "react";
import "../styles/globals.css";

export const TranslationContext = createContext({
  pl: {},
  ukr: {},
});

function MyApp({ Component, pageProps, translations }) {
  return (
    <TranslationContext.Provider value={{ ...translations }}>
      <Component {...pageProps} />
    </TranslationContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const data = await fetch(`${process.env.API_URL}/api/translations`);
  const translations = await data.json();

  return { ...appProps, translations };
};
export default MyApp;
