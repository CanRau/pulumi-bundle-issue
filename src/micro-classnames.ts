/**
 * micro-classnames utility
 * conditionally joining class names
 * inspired by http://jedwatson.github.io/classnames/
 * alternative https://github.com/lukeed/clsx
 *
 * Copyright (c) 2019 Can Rau (canrau.com)
 * Licensed under the MIT License (MIT)
 */

// NOTE: I don't get it working properly with TS at the moment so use clsx instead 🤷🏻‍♂️

type ClassValue = string | string[] | Record<string, boolean>[];

/**
 * valid values are string | string[]
 */
export type CxClassNames = ClassValue[];

const isClassValue = (arg: any): arg is ClassValue =>
  Object.prototype.hasOwnProperty.call(arg, "reduce");

/**
 *
 * @param classNames {(string|string[])} Description about classNames
 * @returns string A space seperated string containing all active CSS class names
 */
export const cx = (...classNames: CxClassNames): string => {
  // const classes = typeof classNames === "string" ? classNames.split(" ") : classNames;
  const classes = classNames instanceof String ? classNames.split(" ") : classNames ?? [];
  if (!classes) return "";
  if (!isClassValue(classes)) return classes;
  return classes.reduce((acc, val) => {
    let result;
    if (val && typeof val === "string") result = `${acc} ${val}`;
    if (val && typeof val === "object" && Object.keys(val)) {
      const keys = Object.keys(val);
      const toggled = keys.reduce((ac, key) => (val[key] ? ac.concat(` ${key}`) : ac), "");
      if (toggled) result = acc.concat(` ${toggled}`);
    }
    return result
      .replace(/\s{2,}/g, " ") // remove duplicate white-space
      .trim(); // trim start & end
  }, "");
};
