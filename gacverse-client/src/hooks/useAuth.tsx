import { useUserStore } from "@/store";
import { CONSTANTS } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";

const useAuth = (): void => {
  const { setUser, clearUser } = useUserStore();

  const getAuth = async (): Promise<void> => {
    try {
      const end_point = CONSTANTS.api_url + "/auth/me";
      const response = await axios.get(end_point, { withCredentials: true });
      if (response.status === 200)
        setUser(response.data.user);
      else
        clearUser();
    } catch (err: unknown) {
      console.error("Authentication failed: " + err);
    }
  }

  useEffect(() => {
    getAuth();
  }, []);
}

export default useAuth;
