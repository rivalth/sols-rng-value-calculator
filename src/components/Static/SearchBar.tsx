import { usePageResults } from "@/contexts/pageResults";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SettingsButton from "./SettingsButton";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const { setResults, auraData } = usePageResults();

  const makeSearch = (search: string) => {
    const filteredResults = auraData.filter((result) => {
      return result.name.toLowerCase().includes(search.toLowerCase());
    });
    setResults(filteredResults);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    makeSearch(search);
  }, [search]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex sticky top-2 z-10 justify-center flex-shrink-0 items-center w-full h-24 py-4 px-6 mt-4 gap-6 bg-gray-300/10 dark:bg-zinc-600/10 rounded-lg backdrop-blur-md shadow-md"
    >
      <input type="text" value={search} onChange={handleChange} placeholder="Search for auras" className="placeholder:text-black/60 focus:placeholder:text-black dark:placeholder:text-white/60 dark:focus:placeholder:text-white w-full px-5 py-3 rounded-lg bg-black/5 focus:bg-black/10 hover:bg-black/10 dark:bg-white/5 dark:focus:bg-white/10 dark:hover:bg-white/10 outline-none transition-all duration-200 border-0 outline outline-transparent dark:focus:outline-purple-600  focus:outline-purple-400" />
      <SettingsButton />
    </motion.div>
  );
}
