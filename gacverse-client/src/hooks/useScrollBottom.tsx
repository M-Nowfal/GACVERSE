import { useEffect, useRef } from "react";

const useScrollBottom = (callback: () => void, offset: number = 250) => {
  const isFetching = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      const nearBottom = scrollTop + clientHeight >= scrollHeight - offset;
      if (nearBottom && !isFetching.current) {
        isFetching.current = true;
        callback();

        setTimeout(() => {
          isFetching.current = false;
        }, 1000);
      } 
    }

    window.addEventListener("scroll", handleScroll);
    
    return () => removeEventListener("scroll", handleScroll);
  }, [callback, offset]);
}

export default useScrollBottom;
