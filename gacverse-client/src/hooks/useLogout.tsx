import { useUserStore } from "@/store";
import { CONSTANTS } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useLogout = () => {
  const { clearUser } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      const end_point = CONSTANTS.api_url + "/auth/logout"
      const response = await axios.post(end_point, {}, { withCredentials: true });
      if (response.status === 200) {
        clearUser();
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errMessage = err.response?.data?.message ||
          err.response?.statusText ||
          "Logout request failed";
        toast.error(errMessage);
        console.error("Logout failed:", errMessage);
      } else {
        toast.error("Unexpected error during logout");
        console.error("Logout failed:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  return { logout, loading };
}

export default useLogout;
