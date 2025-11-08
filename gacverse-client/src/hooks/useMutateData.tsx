import { CONSTANTS } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface UseMutateDataReturn {
  data: any | null;
  loading: boolean;
  error: string | null;
  mutate: (url: string, body: Record<string, any>, headers?: Record<string, any>) => Promise<void>;
}

const useMutateData = (method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST"): UseMutateDataReturn => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutateData = async (url: string, body: Record<string, any>, headers?: Record<string, any>): Promise<void> => {
    setLoading(true);
    try {
      let response = null;
      const end_point = CONSTANTS.api_url + url;
      const config = { headers, withCredentials: true }

      switch (method) {
        case "POST":
          response = await axios.post(end_point, body, config);
          break;
        case "PUT":
          response = await axios.put(end_point, body, config);
          break;
        case "DELETE":
          response = await axios.delete(end_point, config);
          break;
        case "PATCH":
          response = await axios.patch(end_point, body, config);
          break;
        default:
          throw new AxiosError("Invalid http method");
      }

      setData(response.data);
    } catch (err: unknown) {
      const errMessage = err instanceof AxiosError ? err.response?.data?.message : String(err);
      setError(errMessage);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, mutate: mutateData };
}

export default useMutateData;
