import { FC } from "react";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetch";

const SWRConfiguration: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfiguration;
