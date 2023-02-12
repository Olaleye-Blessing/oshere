import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const Page: FC<Props> = (page) => {
  const pathname = usePathname();

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
    <li key={page.label} className="mb-2 md:mb-3">
      <Tag
        {...props}
        className={`${props.className} ${
          !isButtonProps(page) && pathname === page.path
            ? "text-red-primary"
            : "text-white-primary text-opacity-50 hover:text-red-light hover:text-opacity-100"
        }`}
      >
        <span className="inline-block w-4 h-4 mr-[0.375rem] mt-[0.00625rem]">
          {isButtonProps(page) ? (
            <page.icon />
          ) : pathname === page.path ? (
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
