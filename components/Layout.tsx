import { FC, PropsWithChildren } from "react";
import Navbar from "@/components/navigation/navbar/Index";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
