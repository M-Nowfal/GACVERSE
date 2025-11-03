import { Cache } from "@/services/cache";
import { CONSTANTS } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

interface UseFetchPaginationReturn {
  data: any[];
  error: string | null;
  loading: boolean;
  fetchNextPage: () => Promise<void>;
  hasMore: boolean;
}

const cache = new Cache();

const useFetchPagination = (url: string, property: string): UseFetchPaginationReturn => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const nextPage = useRef<number>(1);

  const fetchPage = async (): Promise<void> => {
    try {
      const cacheKey = `${url}?page=${nextPage.current}`;
      setLoading(true);

      if (cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey);
        setData(prev => [...prev, ...cachedData as Array<any>]);
        nextPage.current += 1;
        return;
      }

      const end_point = CONSTANTS.api_url + cacheKey;
      const response = await axios.get(end_point, { withCredentials: true });
      if (response.status === 200) {
        const newData = response.data[property];
        setData(prev => [...prev, ...newData]);
        nextPage.current = response.data.nextPage;
        setHasMore(response.data.hasMore);
        cache.set(cacheKey, newData);
      }
    } catch (err: unknown) {
      const errMessage = err instanceof AxiosError ? err.response?.data?.message : String(err).slice(0, 25);
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage();
  }, []);

  return { data, error, loading, fetchNextPage: fetchPage, hasMore };
}

export default useFetchPagination;
