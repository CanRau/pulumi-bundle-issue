import { createElement, ReactElement } from "react";
import type { ComponentTree, ComponentTreeItem, Components } from "../types/types";
import { log } from "./log";

// via https://medium.com/ovrsea/checking-the-type-of-an-object-in-typescript-the-type-guards-24d98d9119b0
// const isComponentTree = (tree: any): tree is ComponentTree[] => !!(tree as ComponentTree).type;

// todo: wrap emojis to make them bigger?

export const renderDynamicComponents = (
  tree: ComponentTree,
  components?: Components
): ReactElement[] =>
  tree.map((item: ComponentTreeItem, index: number) => {
    if (!item.component) return item;

    // const Comp = components[item.component] ?? item.component;
    const Comp = item.component;
    const props = item.props ?? {};

    if (!props?.key) {
      throw new Error(
        `Component is missing a unique 'key' for ${log(JSON.stringify({ index, component: Comp }))}`
      );
    }

    if (item.children !== undefined) {
      if (typeof item.children === "string") {
        props.children = item.children;
      } else if (
        Array.isArray(item.children)
        // todo: fix Type Guard?
        // &&
        // isComponentTree(item.children)
      ) {
        props.children = renderDynamicComponents(item.children, components);
        // log(props.children);
      }
    }

    if (components?.[Comp] !== undefined) {
      // if (Comp !== Comp.toLowerCase() && components[Comp] === undefined) {
      // if (components[Comp] === undefined) {
      //   throw new Error(`Component "${Comp}" doesn't exist!`);
      // }
      return createElement(components[Comp], props);
    }

    return createElement(Comp, props);
  });
