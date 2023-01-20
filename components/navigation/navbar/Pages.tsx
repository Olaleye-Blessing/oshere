import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { categoryPages, generalPages } from "./utlis";

const navPages = [...generalPages, ...categoryPages];

const Pages: FC = () => {
  const pathname = usePathname();

  return (
    <ul className="mt-4">
      {navPages.map(({ header, pages }) => {
        return (
          <li key={header} className="mb-5 md:mb-10">
            <h5 className="mb-1">{header}</h5>
            <ul>
              {pages.map((page) => {
                return (
                  <li key={page.label} className="mb-2 md:mb-3">
                    <Link
                      href={page.path}
                      className={`flex items-center justify-start ${
                        pathname === page.path
                          ? "text-red-primary"
                          : "hover:text-red-light"
                      }`}
                    >
                      <span className="inline-block w-4 h-4 mr-1 mt-1">
                        {pathname === page.path ? (
                          <page.activeIcon />
                        ) : (
                          <page.icon />
                        )}
                      </span>
                      <span>{page.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Pages;
