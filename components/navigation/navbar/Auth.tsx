import { FC } from "react";
import { useSession } from "next-auth/react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { getUserPages } from "./utlis";
import Page from "./Page";

const header = "General";

const Auth: FC = () => {
  const { data, status } = useSession();

  return (
    <>
      <li key={header} data-testid="nav-auth" className="mb-5 md:mb-10">
        <h5 className="mb-1 font-medium">{header}</h5>
        {status === "loading" ? (
          <LoadingIndicator className="ml-0" />
        ) : (
          <ul>
            {getUserPages(data).map((page) => {
              return <Page key={page.label} {...page} />;
            })}
          </ul>
        )}
      </li>
    </>
  );
};

export default Auth;
