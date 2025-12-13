import React from "react"
import { useTheme } from "next-themes"
import { IconContext } from "react-icons"
import { FaSun, FaMoon } from 'react-icons/fa'

const Button = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 mr-1 h-16 w-16 rounded p-1 sm:ml-4"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    > 
      <IconContext.Provider value={{ className: "theme-switch" }}> 
        <div>
          {(theme === 'dark') ?  (<FaSun />) : (<FaMoon />) }
        </div>
      </IconContext.Provider>
        
    </button>
  )
}

export default Button;
