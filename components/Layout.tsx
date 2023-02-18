import { FC, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import Navbar from "@/components/navigation/navbar/Index";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useRouter();
  console.log({ pathname });

  const twoColumnLayout = [
    "/",
    "/communities",
    "/search",
    "/bookmarks",
    "/communities/[category]/[id]",
  ];

  return (
    <div className={`${inter.variable} font-sans`}>
      <div
        className={
          pathname && twoColumnLayout.includes(pathname)
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
