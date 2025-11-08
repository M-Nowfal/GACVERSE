import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { CONSTANTS } from "@/utils/constants";
import { toast } from "sonner";
import { Cache } from "@/services/cache";

interface UseFetchDataReturn {
  data: any;
  loading: boolean;
  error: string | null;
  reFetchData: (apiUrl?: string) => Promise<void>;
}

const cache = new Cache();

const useFetchData = (url: string): UseFetchDataReturn => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (apiUrl?: string): Promise<void> => {
    setLoading(true);
    try {
      const end_point = CONSTANTS.api_url + (apiUrl || url);
      if (cache.has(end_point)) {
        setData(cache.get(end_point));
      } else {
        const response = await axios.get(end_point, { withCredentials: true });
        if (response.status === 200) {
          setData(response.data);
          cache.set(end_point, response.data);
        } else {
          toast.warning(response.data.message);
        }
      }
    } catch (err: unknown) {
      const errMessage = err instanceof AxiosError ? err.response?.data?.message : String(err);
      setError(errMessage);
      setTimeout(() => setError(null), 5000);
      toast.error(errMessage || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, reFetchData: fetchData };
}

export default useFetchData;
