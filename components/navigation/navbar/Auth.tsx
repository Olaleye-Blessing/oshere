import { FC } from "react";
import { useSession } from "next-auth/react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { getUserPages } from "./utlis";
import Page from "./Page";

type DataTestIds = {
  [key: string]: string;
};

const dataTestIds: DataTestIds = {
  General: "nav-auth",
};

const Auth: FC = () => {
  const { data, status } = useSession();

  return (
    <>
      {getUserPages(data).map(({ header, pages }) => {
        return (
          <li
            data-testid={dataTestIds[header]}
            key={header}
            className="mb-5 md:mb-10"
          >
            <h5 className="mb-1 font-medium">{header}</h5>
            {status === "loading" ? (
              <LoadingIndicator className="ml-0" />
            ) : (
              <ul>
                {pages.map((page) => {
                  return <Page key={page.label} {...page} />;
                })}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
};

export default Auth;
