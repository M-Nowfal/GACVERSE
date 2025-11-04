import { useUserStore } from "@/store/useUserStore";
import { CONSTANTS } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface UseAuth {
  isLoggedIn: boolean;
}

const useAuth = (): UseAuth => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { setUser, clearUser } = useUserStore();

  const getAuth = async (): Promise<void> => {
    try {
      const end_point = CONSTANTS.api_url + "/auth/me";
      const response = await axios.get(end_point, { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      } else {
        clearUser();
        setIsLoggedIn(false);
      }
    } catch (err: unknown) {
      console.error("Authentication failed: " + err);
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  return { isLoggedIn };
}

export default useAuth;
