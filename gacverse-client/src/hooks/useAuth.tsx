import { useUserStore } from "@/store";
import { CONSTANTS } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = (): Record<"loading", boolean> => {
  const { setUser, clearUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const getAuth = async (): Promise<void> => {
    setLoading(true);
    try {
      const end_point = CONSTANTS.api_url + "/auth/me";
      const response = await axios.get(end_point, { withCredentials: true });
      if (response.status === 200)
        setUser(response.data.user);
      else
        clearUser();
    } catch (err: unknown) {
      console.error("Authentication failed: " + err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  return { loading };
}

export default useAuth;
