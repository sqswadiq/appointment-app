import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("dark") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="border border-gray-800 p-2 rounded-full text-sm dark:text-white bg-gray-900 dark:bg-white dark:border-white"
    >
      {dark ? <FaSun className="dark:text-gray-800 dark:bg-white" /> : <FaMoon className="text-white dark:bg-gray-900" />}
    </button>
  );
}
