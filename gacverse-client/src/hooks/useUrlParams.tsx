import { useParams, useSearchParams } from "react-router-dom";

const useUrlParams = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const query: Record<string, string> = {};

  for (const [key, value] of searchParams.entries())
    query[key] = value;

  return { params, query };
}

export default useUrlParams;
