import { useState, useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to handle page refresh
    const handleBeforeUnload = () => {
      setLoading(true);
    };

    const handleLoad = () => {
      setLoading(false);
    };

    // Add event listener for beforeunload to detect refresh
    window.addEventListener("beforeunload", handleBeforeUnload);
    // Add event listener for load to hide spinner after page loads
    window.addEventListener("load", handleLoad);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
