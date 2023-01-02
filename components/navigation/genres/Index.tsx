import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const genres = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}`,
  label: `Genre ${i + 1}`,
}));

const Index = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "tvshows";
  const currentGenre = searchParams.get("genre") || "1";

  return (
    <div data-cy="nav__genres">
      <ul className="mt-3 flex whitespace-nowrap items-center justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8">
        {genres.map((genre) => (
          <li key={genre.id} className="mb-2">
            <Link
              data-cy={`nav__genre--${genre.id}`}
              href={`/?category=${category}&genre=${genre.id}`}
              className={`py-1 capitalize font-semibold ${
                currentGenre === genre.id
                  ? "text-red-primary text-opacity-100"
                  : "text-white hover:text-red-primary text-opacity-30"
              }`}
            >
              {genre.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
