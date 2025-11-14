import { useAuthStore, useUserStore } from "@/store";
import { CONSTANTS } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = (): Record<"loading", boolean> => {
  const { setUser, clearUser } = useUserStore();
  const { isAuth, toggleAuth } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);

  const getAuth = async (): Promise<void> => {
    setLoading(true);
    try {
      const end_point = CONSTANTS.api_url + "/auth/me";
      const response = await axios.get(end_point, { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data.user);
        toggleAuth(true);
      } else {
        clearUser();
        toggleAuth(false);
      }
    } catch (err: unknown) {
      console.error("Authentication failed: " + err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    !isAuth && getAuth();
  }, []);

  return { loading };
}

export default useAuth;
