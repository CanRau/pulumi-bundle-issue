import React, { PropsWithChildren, ReactElement, useRef } from "react";
import { useButton } from "@react-aria/button";
import { FocusRing } from "@react-aria/focus";

type ButtonProps = PropsWithChildren<{
  /**
   * Is this the principal call to action on the page?
   */
  variant?: "primary" | "secondary" | "text";
  /**
   * What button type to use
   */
  type?: "button" | "submit" | "reset";
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Optional click handler
   */
  onClick?: () => void;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNotFalsy = (x: any) => x;

/**
 * Primary UI component for user interaction
 */
export const Button = (props: ButtonProps): ReactElement => {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const { children, type = "button", size = "medium" } = props;
  const classeNames = [
    // OLD "bg-nord7","text-white","active:bg-pink-600","font-bold","uppercase","text-sm","px-6","py-3","rounded","shadow","hover:shadow-lg","outline-none","focus:outline-none","mr-1","mb-1","ease-linear","transition-all","duration-150",
    size === "large" ? "w-full" : null,
    "px-4",
    "py-2",
    "my-2",
    "font-medium",
    "text-white",
    "transition",
    "duration-500",
    "ease-in-out",
    "transform",
    "bg-nord14",
    "border-nord7",
    "rounded-md",
    "focus:shadow-outline",
    "focus:outline-none",
    "focus:ring-2",
    "ring-offset-current",
    "ring-offset-2",
    "hover:bg-blue-800",
  ];

  return (
    // fix: focus:border-pink-600
    <FocusRing focusRingClass="focus:ring focus:border-blue-400">
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        // className="bg-nord0 text-nord11 font-semibold uppercase inline-flex border-transparent flex-wrap items-center justify-center text-center cursor-pointer select-none transition duration-200 ease-in-out rounded-btn flex-shrink-0 px-4 leading-loose h-12 text-sm min-h-12 focus:outline-none disabled:pointer-events-none"
        // based on https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/buttons/regular/filled
        className={classeNames.filter(isNotFalsy).join(" ")}
        {...props}
        {...buttonProps}
        ref={ref}
      >
        {children}
      </button>
    </FocusRing>
  );
};
