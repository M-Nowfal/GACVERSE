import { Cache } from "@/services/cache";
import { CONSTANTS } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

interface UseFetchPaginationReturn {
  data: Course[] | Testimonial[];
  error: string | null;
  loading: boolean;
  fetchNextPage: (search?: string) => Promise<void>;
  hasMore: boolean;
  isFetching: boolean;
}

const cache = new Cache();

const useFetchPagination = (url: string, property: string, search?: string): UseFetchPaginationReturn => {
  const [data, setData] = useState<Course[] | Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const nextPage = useRef<number>(1);

  const fetchPage = async (newSearch?: string): Promise<void> => {
    try {
      const searchQuery = newSearch || search;
      const cacheKey = `${url}?page=${nextPage.current}${searchQuery ? `&search=${searchQuery}` : ""}`;
      setLoading(true);
      newSearch && setIsFetching(true);
      if (cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey);
        if (searchQuery)
          setData(cachedData as Array<any>);
        else {
          setData(prev => [...prev, ...cachedData as Array<any>]);
          nextPage.current += 1;
        }
        return;
      }

      const end_point = CONSTANTS.api_url + cacheKey;
      const response = await axios.get(end_point, { withCredentials: true });
      if (response.status === 200) {
        const newData = response.data[property];
        if (searchQuery)
          setData(newData);
        else
          setData(prev => [...prev, ...newData]);
        nextPage.current = response.data.nextPage;
        setHasMore(response.data.hasMore);
        cache.set(cacheKey, newData);
      }
    } catch (err: unknown) {
      const errMessage = err instanceof AxiosError ? err.response?.data?.message : String(err).slice(0, 25);
      setError(errMessage);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchPage();
  }, []);

  return {
    data, error,
    loading, fetchNextPage: fetchPage,
    hasMore, isFetching
  };
}

export default useFetchPagination;
