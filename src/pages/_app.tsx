import { PageResultsProvider } from "@/contexts/pageResults";
import { ModalProvider } from "@/contexts/useModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        if (localStorage.getItem("darkMode") === "true") {
          setIsDarkMode(true);
          document.documentElement.classList.add("dark");
        }
      }
    };

    checkDarkMode(); // Check dark mode on initial render

    window.addEventListener("load", checkDarkMode);

    return () => {
      window.removeEventListener("load", checkDarkMode);
    };
  }, []);
  return (
    <>
      <ModalProvider>
        <PageResultsProvider>
          <Component {...pageProps} />
        </PageResultsProvider>
      </ModalProvider>
    </>
  );
}
