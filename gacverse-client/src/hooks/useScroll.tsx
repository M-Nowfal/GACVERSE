import { useEffect } from "react";

const useScroll = (scrollTo: "top" | "bottom" = "top"): void => {
  useEffect(() => {
    window.scrollTo({ [scrollTo]: 0 });
  }, []);
}

export default useScroll;
