import React, { ReactElement, PropsWithChildren } from "react";
import cx from "clsx";
import type { Components } from "types/types";
import { Button } from "./Button/Button";
import { Hero } from "./Hero/Hero";
import { NotFound } from "./illustrations/NotFound";
import { NewsletterSignup } from "./NewsletterSignup";

const getTextColor = (color: string): string => {
  const colors: Record<string, string> = {
    primary: "text-primary",
  };
  return colors[color] ?? "";
};

const getAlign = (color: string): string => {
  const colors: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };
  return colors[color] ?? "";
};

const getFontSize = (size: string): string => {
  const sizes: Record<string, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };
  return sizes[size] ?? "";
};

type SpanProps = PropsWithChildren<{
  isBlock?: boolean;
  size?: string;
  textColor?: string;
}>;

const Span = ({
  isBlock = false,
  size = "",
  textColor = "",
  children,
}: SpanProps): ReactElement => {
  const className = cx(getTextColor(textColor), getFontSize(size), {
    block: isBlock,
  });
  return <span className={className}>{children}</span>;
};

type HeadlineProps = PropsWithChildren<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "" | "left" | "center" | "right" | "justify";
  textColor?: string;
  size?: string;
  className?: string;
}>;

const Headline = ({
  level = 2,
  size = "",
  align = "",
  textColor = "",
  className: _className = "",
  children,
  ...props
}: HeadlineProps): ReactElement => {
  const className = cx(
    "mb-0",
    getFontSize(size),
    getAlign(align),
    getTextColor(textColor),
    _className
  );
  return React.createElement(`h${level}`, { className, ...props }, children);
};

type TextProps = PropsWithChildren<{
  align?: "" | "left" | "center" | "right" | "justify";
  textColor?: string;
  size?: string;
}>;

const Text = ({ size = "", align = "", textColor = "", children }: TextProps): ReactElement => {
  const className = cx("mb-0 mt-4", getFontSize(size), getAlign(align), getTextColor(textColor));
  return React.createElement("p", { className }, children);
};

export const components: Components = {
  Hero,
  Button,
  Headline,
  Text,
  Span,
  NewsletterSignup,
  NotFound,
};
