import { useMemo } from "react";
import { 
  useLocation, 
  useNavigate, 
  useParams, 
  useSearchParams, 
  type NavigateFunction,
  type Location
} from "react-router-dom";

type QueryParams = Record<string, string>;

interface ReactRouter {
  params: Record<string, string | undefined>;
  query: QueryParams;
  state: Record<string, string>;
  navigate: NavigateFunction;
  location: Location;
}

const useReactRouter = (): ReactRouter => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const query = useMemo(() => {
    const q: QueryParams = {};
    for (const [key, value] of searchParams.entries()) {
      q[key] = value;
    }
    return q;
  }, [searchParams]);

  return { params, query, state: location.state, location, navigate };
}

export default useReactRouter;
