import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useModal } from "@/contexts/useModal";
import { Switch } from "@mui/material";
import { useRouter } from "next/router";

export default function SettingsModal() {
  const router = useRouter();

  const { closeModal } = useModal();

  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const [isGifs, setIsGifs] = React.useState<boolean>(false);

  useEffect(() => {
    const checkData = () => {
      if (typeof window != "undefined" && typeof localStorage != "undefined") {
        if (localStorage.getItem("darkMode") === "true") {
          setIsDarkMode(true);
          if (isDarkMode) document.documentElement.classList.add("dark");
        }
        if (localStorage.getItem("gifs") === "true") {
          setIsGifs(true);
        }
      }
    };
    checkData();

    window.addEventListener("storage", checkData);
    return () => {
      window.removeEventListener("storage", checkData);
    };
  }, []);

  const handleDarkMode = () => {
    if (isDarkMode) {
      localStorage.setItem("darkMode", "false");
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("darkMode", "true");
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  };

  const handleGifs = () => {
    if (isGifs) {
      localStorage.setItem("gifs", "false");
      setIsGifs(false);
    } else {
      localStorage.setItem("gifs", "true");
      setIsGifs(true);
    }
  };

  return (
    <div className="w-[400px] h-[500px] bg-white dark:bg-zinc-900 rounded-md border border-zinc-400/20 dark:border-zinc-700/20">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={closeModal}
          className="text-2xl mt-[2px] text-black/60 hover:text-black focus:text-black dark:text-white dark:hover:text-white dark:focus:text-white"
        >
          <i className="far fa-times"></i>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between border-b border-zinc-400/40 py-4">
          <p className="text-xl">Dark Mode</p>
          <Switch
            color="secondary"
            checked={isDarkMode}
            onChange={handleDarkMode}
          />
        </div>
        <div className="flex items-center justify-between border-b border-zinc-400/40 py-4">
          <p className="text-xl">Always use gifs</p>
          <Switch color="secondary" checked={isGifs} onChange={handleGifs} />
        </div>
      </div>
      <div className="p-4 w-full flex-col flex items-center mt-8 justify-center">
        <a href="https://github.com/rivalth/sols-rng-value-calculator" className="group transition-all duration-200 flex items-center justify-center flex-col gap-2">
          <i className="fab fa-github text-8xl" />
          <h1 className="text-xl font-medium underline decoration-transparent group-hover:decoration-purple-600 underline-offset-2 group-hover:text-purple-600 transition-all duration-200">This project is open-source</h1>
          <span className="text-xs text-zinc-400 -mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200 delay-200">Click the logo for navigate</span>
        </a>
      </div>
    </div>
  );
}
