import React, { useState, PropsWithChildren, SyntheticEvent } from "react";

type TextareaProps = PropsWithChildren<{
  /**
   * Is this the principal call to action on the page?
   */
  variant?: "primary" | "secondary" | "text";
  placeholder?: string;
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
  onInputChange?: (value: string) => void;
  value?: string;
  wrapperProps?: any;
  labelProps?: any;
  inputProps?: any;
}>;

/**
 * Primary UI component for user interaction
 */
export const Textarea = ({
  variant,
  type = "button",
  size = "medium",
  placeholder = "",
  onInputChange = () => {},
  value,
  wrapperProps,
  labelProps,
  inputProps,
  children,
}: TextareaProps) => {
  const [localValue, setValue] = useState(value);

  const onInputChangeHandler = (event: SyntheticEvent) => {
    setValue(event.target.value);
    onInputChange(event.target.value);
  };

  return (
    <div className="flex flex-col" {...wrapperProps}>
      <label className="flex flex-col" {...labelProps}>
        <span className="text-sm py-2">{children}</span>
        <textarea
          // className="h-24 flex-shrink py-2 px-4 min-h-4 text-sm leading-8" // DaisyUI
          className="px-3 py-3 placeholder-nord3 text-nord0 relative bg-nord4 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          placeholder={placeholder}
          onInput={onInputChangeHandler}
          value={localValue}
          {...inputProps}
        />
      </label>
    </div>
  );
};
