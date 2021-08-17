import React, { ReactElement, PropsWithChildren } from "react";
import cx from "clsx";

export type LinkProps = PropsWithChildren<{
  to: string;
  href?: string;
}>;

export const Link = ({ to, children }: LinkProps): ReactElement => {
  const className = cx("hover:underline");
  return React.createElement("a", { className, href: to }, children);
};
