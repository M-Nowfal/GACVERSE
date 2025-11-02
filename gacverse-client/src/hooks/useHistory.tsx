import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useHistory = () => {
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname !== "/") 
      setCanGoBack(true);
    else
      setCanGoBack(false);
  }, [location.pathname]);

  return { canGoBack }; 
}

export default useHistory;
