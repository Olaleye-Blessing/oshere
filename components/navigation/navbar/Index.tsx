import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import HomeLogo from "@/components/HomeLogo";
import Auth from "./Auth";
import Pages from "./Pages";
import Search from "./Search";

const Index = () => {
  const pathname = usePathname();
  const navLists = useRef<HTMLDivElement | null>(null);

  const toggleNav = () => {
    const navListsCont: HTMLDivElement = navLists.current!;

    navListsCont.classList.toggle("h-[calc(100vh-3.7rem)]");
  };

  useEffect(() => {
    const navListsCont: HTMLDivElement = navLists.current!;

    navListsCont.classList.remove("h-[calc(100vh-3.7rem)]");
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
          <Pages />
          <Auth />
        </ul>
        <Search />
      </div>
    </nav>
  );
};

export default Index;
