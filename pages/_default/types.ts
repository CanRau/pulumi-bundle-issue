import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

export type PageProps = Record<string, unknown>; // or Record<string, never>

export type PageContext = PageContextBuiltIn & {
  Page: (pageProps: PageProps) => JSX.Element;
  pageProps: PageProps;
  documentProps?: {
    title?: string;
    description?: string;
  };
  contextProps: {
    locale: string;
  };
};
