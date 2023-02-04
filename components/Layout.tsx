import { FC, PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "@next/font/google";
import Navbar from "@/components/navigation/navbar/Index";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  const twoColumnLayout = ["/communities", "/search"];

  return (
    <div className={`${inter.variable} font-sans`}>
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
    </div>
  );
};

export default Layout;
