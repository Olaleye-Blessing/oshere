import { FC } from "react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export interface LinkProps {
  label: string;
  path: string;
  activeIcon: any;
}

interface PageProps {
  icon: any;
}

export type Props = (ButtonProps | LinkProps) & PageProps;

const isButtonProps = (props: ButtonProps | LinkProps): props is ButtonProps =>
  "onClick" in props;

const activePath = (
  path: string,
  { pathname: currentPath, query, asPath, isReady }: NextRouter
) => {
  if (!isReady) return false;

  if (Object.keys(query).length === 0) return path === currentPath;

  return path !== "/" && asPath.includes(path);
};

const Page: FC<Props> = (page) => {
  const router = useRouter();

  const Tag = isButtonProps(page) ? "button" : Link;

  let props: any = {
    className: "flex items-center justify-start",
  };

  if (isButtonProps(page)) {
    props = {
      ...props,
      onClick: page.onClick,
    };
  } else {
    props = {
      ...props,
      href: page.path,
    };
  }

  return (
    <li key={page.label} className="mb-2 md:mb-4">
      <Tag
        {...props}
        className={`${props.className} ${
          !isButtonProps(page) && activePath(page.path, router)
            ? "text-red-primary font-semibold"
            : "text-white-primary hover:text-red-light"
        }`}
      >
        <span className="inline-block w-4 h-4 mr-[0.4rem] mt-[0.00625rem]">
          {isButtonProps(page) ? (
            <page.icon />
          ) : router.pathname === page.path ? (
            <page.activeIcon />
          ) : (
            <page.icon />
          )}
        </span>
        <span>{page.label}</span>
      </Tag>
    </li>
  );
};

export default Page;
