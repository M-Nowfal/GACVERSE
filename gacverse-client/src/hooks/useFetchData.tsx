import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { CONSTANTS } from "@/utils/constants";
import { toast } from "sonner";

interface UseFetchDataReturn {
  data: any;
  loading: boolean;
  error: string | null;
  reFetchData: (apiUrl?: string) => Promise<void>;
}

const useFetchData = (url: string): UseFetchDataReturn => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (apiUrl?: string): Promise<void> => {
    try {
      const end_point = CONSTANTS.api_url + (apiUrl || url);
      setLoading(true);
      const response = await axios.get(end_point, { withCredentials: true });
      if (response.status === 200)
        setData(response.data);
      else
        toast.warning(response.data.message);
    } catch (err: unknown) {
      const errMessage = err instanceof AxiosError ? err.response?.data?.message : String(err);
      setError(errMessage);
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
