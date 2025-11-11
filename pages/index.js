import { useEffect, useState } from "react";
import Head from "next/head";

import BottomBar from "../components/BottomBar";
import Hero from "../components/hero";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // Expand the app to full screen
      tg.setHeaderColor("#161616");

      // Set the background color of the app itself
      tg.setBackgroundColor("#161616");

      console.log("Telegram Web App script loaded");

      const initData = tg.initData || "";
      console.log("Init data:", initData);

      if (initData) {
        console.log("Attempting to authenticate with Telegram Mini App");
        authenticateUser(initData);
      } else {
        console.log("No init data available");
        setIsLoading(false);
      }
    };

    document.head.appendChild(script);
  }, []);

  const authenticateUser = async (initData) => {
    try {
      const response = await fetch("/api/telegram-mini-app-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData }),
      });

      console.log("Auth response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Auth response data:", data);

      if (data.success) {
        setUser(data.user);
        console.log("User authenticated successfully:", data.user);

        localStorage.setItem("jwt", data.token);

        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem("tokenExpiration", expirationTime.toString());

        console.log("JWT token and expiration time stored in localStorage");
      } else {
        console.error("Authorization failed");
      }
    } catch (error) {
      console.error("Auth Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(`Welcome, ${user.username}!`);
    }
  }, [user]);

  useEffect(() => {
    const hasShownNotification = localStorage.getItem("notificationShown");

    if (!hasShownNotification) {
      setShowNotification(true);
      localStorage.setItem("notificationShown", "true");
    }
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <div>
        <Hero setAmount={setAmount} />
      </div>
    </div>
  );
}
