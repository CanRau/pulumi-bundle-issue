import React, { ReactElement, PropsWithChildren } from "react";
// import { SSRProvider, Provider, defaultTheme } from "@adobe/react-spectrum";
import { SSRProvider } from "@react-aria/ssr";
import { log } from "src/log";
// import NotFound from '@spectrum-icons/illustrations/NotFound'; // NOT WORKING in VITE CJS

type PageProps = PropsWithChildren<{
  url?: string;
  slug?: string;
  slugParts?: string[];
  error?: string;
}>;

// const mapProp = (prop) => {
//   console.log({ prop });
//   // return
// };

export const Page = ({
  // url,
  // slug,
  // slugParts,
  error,
  children,
}: PageProps): ReactElement => {
  // if (error) {
  //   return (
  //     <section className="bg-nord3 flex justify-center items-center p-52 text-nord4">
  //       <h1>{error}</h1>
  //     </section>
  //   );
  // }
  log("empty index.page.tsx log");

  // TODO: How to add "@adobe/react-spectrum" to vite-plugin-ssr
  return (
    <SSRProvider>
      {/* <Provider theme={defaultTheme} locale="en-US"> */}
      {children}
      {/* </Provider> */}
    </SSRProvider>
  );
};
