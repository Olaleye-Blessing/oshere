import { FC, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  className?: string;
}

const Search: FC<SearchProps> = ({ className }) => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  return (
    <form
      className={`mt-auto mb-4 ${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="navbar__search--cont">
        <input
          role="search"
          type="search"
          name="name"
          id="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            let query = search.trim();

            if (!query) return;

            if (e.key === "Enter") {
              router.push(`/search?q=${query}`, undefined, { shallow: true });
            }
          }}
          className="block w-full border-0 border-b border-transparent bg-white bg-opacity-5 transition-all duration-200 shadow-2xl focus:shadow-sm focus:border-transparent focus:ring-0 sm:text-sm"
          placeholder="Search"
        />
        <span className="w-4 h-4 absolute top-1/2 right-2 transform -translate-y-1/2 text-white-primary">
          <MagnifyingGlassIcon />
        </span>
      </div>
    </form>
  );
};

export default Search;
