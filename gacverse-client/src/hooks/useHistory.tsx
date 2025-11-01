import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHistory = () => {
  const location = useLocation();
  const canGoBack = useRef<boolean>(false);

  useEffect(() => {
    if (location.pathname !== "/") 
      canGoBack.current = true;
    else
      canGoBack.current = false;
  }, [location.pathname]);

  return { canGoBack: canGoBack.current }; 
}

export default useHistory;
