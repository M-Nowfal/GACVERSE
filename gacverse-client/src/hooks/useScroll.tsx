import { useEffect } from "react";

const useScroll = (): void => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
}

export default useScroll;
