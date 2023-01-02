import { FC } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { medias } from "./utlis";

const Index: FC = () => {
  const searchParams = useSearchParams();
  const pageCategory = searchParams.get("category") || "tvshows";

  return (
    <nav data-cy="nav__media" aria-label="media">
      <ul className="flex items-center justify-start space-x-2">
        {medias.map(({ category, label }) => (
          <li key={category}>
            <Link
              data-cy={`nav__media--category--${category}`}
              href={`/?category=${category}`}
              className={`${
                pageCategory === category
                  ? "text-red-primary"
                  : "text-white hover:text-red-light"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Index;
