import Link from "next/link";
import { FC } from "react";

interface IHomeLogoProps {
  className?: string;
}

const HomeLogo: FC<IHomeLogoProps> = ({ className = "" }) => {
  return (
    <Link
      href="/"
      className={`text-lg uppercase md:text-xl lg:text-2xl ${className}`}
      translate="no"
    >
      Oshere
    </Link>
  );
};

export default HomeLogo;
