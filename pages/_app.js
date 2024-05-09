import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, [router.events, router.pathname]);

  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          waitingTime={600}
          onLoaderFinished={() => setProgress(0)}
        />
        <Component {...pageProps} />;
        <Footer />
      </SessionProvider>
    </>
  );
}
