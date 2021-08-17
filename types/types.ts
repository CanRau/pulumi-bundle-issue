import type { ReactElement } from "react";

export type Components = Record<string, (props: any) => ReactElement>;

export type ComponentTree = Record<string, string | ComponentTree>;

export type ComponentTreeItem = {
  component: string;
  props?: ComponentTree;
  children?: string | string[] | ComponentTree | ComponentTree[] | ReactElement | ReactElement[];
};
