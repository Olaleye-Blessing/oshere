import { FC } from "react";
import Link from "next/link";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Category } from "@/interfaces/common";

export interface Genre {
  id: number;
  name: string;
}

export interface Props {
  category: Category;
  loading: boolean;
  error: string | undefined;
  genres: Genre[];
  genre: string | null;
}

const Index: FC<Props> = ({
  category,
  error,
  genres,
  loading,
  genre: currentGenre,
}) => {
  if (loading) return <LoadingIndicator className="my-3" />;

  return (
    <div data-cy="nav__genres">
      {error ? (
        <p data-testid="genres-nav-error" className="error">
          {error}
        </p>
      ) : (
        <ul
          data-testid="genres-nav-data"
          className="mt-3 flex whitespace-nowrap items-center justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8"
        >
          {genres.map((genre) => (
            <li key={genre.id} className="mb-2">
              <Link
                data-cy={`nav__genre--${genre.id}`}
                href={`/?category=${category}&genre=${genre.id}`}
                className={`py-1 capitalize ${
                  Number(currentGenre) === genre.id
                    ? "text-red-primary"
                    : "text-white hover:text-red-primary"
                }`}
              >
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Index;
