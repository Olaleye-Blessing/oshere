import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import HomeLogo from "@/components/HomeLogo";
import { categoryPages, generalPages } from "./utlis";
import Auth from "./Auth";

const navPages = [...generalPages, ...categoryPages];

const Index = () => {
  const pathname = usePathname();
  const navLists = useRef<HTMLDivElement | null>(null);

  const toggleNav = () => {
    const navListsCont: HTMLDivElement = navLists.current!;

    navListsCont.classList.toggle("h-[calc(100vh-4rem)]");
  };

  useEffect(() => {
    const navListsCont: HTMLDivElement = navLists.current!;

    navListsCont.classList.remove("h-[calc(100vh-4rem)]");
  }, [pathname]);

  return (
    <nav data-testid="navbar" className="navbar">
      <HomeLogo />
      <button
        data-cy="navbar__toggle"
        className="w-6 h-6 hover:text-red-primary md:hidden"
        onClick={toggleNav}
      >
        <Bars3Icon />
      </button>
      <div
        data-cy="navbar__list--cont"
        ref={navLists}
        className="navbar__list--cont"
      >
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
        <Auth />
      </div>
    </nav>
  );
};

export default Index;
