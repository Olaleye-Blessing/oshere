import { FC, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navigation/navbar/Index";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  const twoColumnLayout = ["/communities", "/search"];

  return (
    <div
      className={
        twoColumnLayout.some((path) => String(pathname).includes(path))
          ? "layout__two"
          : "layout__three"
      }
    >
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
