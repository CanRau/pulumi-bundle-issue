import React, { useState, PropsWithChildren, SyntheticEvent, ReactElement } from "react";

type InputProps = PropsWithChildren<{
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
export const Input = ({
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
}: InputProps): ReactElement => {
  const [localValue, setValue] = useState(value);

  // https://stackoverflow.com/q/44321326/3484824
  // const onInputChangeHandler = (event: SyntheticEvent) => {
  // const onInputChangeHandler = (event: SyntheticEvent) => {
  //   const inputElement = event.target as HTMLInputElement;
  //   setValue(inputElement.value);
  //   onInputChange(inputElement.value);
  // };
  const onInputChangeHandler = (event: { target: HTMLInputElement }) => {
    setValue(event.target.value);
    onInputChange(event.target.value);
  };

  return (
    <div className="flex flex-col" {...wrapperProps}>
      <label className="flex flex-col" {...labelProps}>
        <span className="text-sm py-2">{children}</span>
        <input
          type="text"
          placeholder={placeholder}
          // className="flex-shrink px-4 h-12 text-sm leading-8" // DaisyUI
          className="px-3 py-3 placeholder-nord3 text-nord0 relative bg-nord4 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          onInput={onInputChangeHandler}
          value={localValue}
          {...inputProps}
        />
      </label>
    </div>
  );
};
