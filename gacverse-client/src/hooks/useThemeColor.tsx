import { useEffect } from 'react'

const useThemeColor = (theme: string): void => {
  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    const color = theme === "dark" ? "#000000" : "#ffffff"

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", color)
    }
  }, [theme])
}

export default useThemeColor;
