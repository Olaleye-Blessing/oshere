import { FC } from "react";
import Link from "next/link";
import { medias } from "./utlis";
import { Category } from "@/interfaces/common";

interface Props {
  pageCategory: Category;
}

const Index: FC<Props> = ({ pageCategory }) => {
  return (
    <nav data-cy="nav__media" aria-label="media">
      <ul className="flex items-center justify-start space-x-2">
        {medias.map(({ category, label }) => (
          <li key={category}>
            <Link
              data-testid={`nav__media--category--${category}`}
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
