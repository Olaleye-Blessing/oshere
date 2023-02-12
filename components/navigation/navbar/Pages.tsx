import { FC } from "react";
import { usePathname } from "next/navigation";
import { categoryPages, generalPages } from "./utlis";
import Page from "./Page";

const navPages = [...generalPages, ...categoryPages];

const Pages: FC = () => {
  const pathname = usePathname();

  return (
    <>
      {navPages.map(({ header, pages }) => {
        return (
          <li key={header} className="mb-5 md:mb-10">
            <h5 className="mb-1 font-medium">{header}</h5>
            <ul>
              {pages.map((page) => {
                return <Page key={page.label} {...page} />;
              })}
            </ul>
          </li>
        );
      })}
    </>
  );
};

export default Pages;
