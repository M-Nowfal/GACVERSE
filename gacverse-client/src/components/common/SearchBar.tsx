import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useId, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useHistory } from "@/hooks";

const SearchBar = ({ onSearch }: { onSearch?: (search: string) => Promise<void> }): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const { canGoBack } = useHistory();

  const handleSearch = () => {
    if (input.trim() && onSearch)
      onSearch(input.trim());
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")
      handleSearch();
  }

  return (
    <div className="flex justify-center w-full max-w-2xl m-auto">
      <div className="bg-card flex items-center justify-between gap-1 border w-full p-0.5 rounded-md">
        <div className="flex items-center w-full">
          <Search className="text-gray-400 size-5 ms-2" />
          <Input
            type="search"
            autoComplete="off"
            id={useId()}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            value={input}
            placeholder="Search for courses"
            className="ps-2 border-0 focus-visible:ring-0 focus:outline-0 w-full shadow-none"
          />
        </div>
        <Link to={(!canGoBack && input) ? `/courses/?search=${input}` : ""} viewTransition>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSearch}
          >
            <span className="hidden lg:block">Search</span>
            <Search className="size-5 lg:hidden" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
