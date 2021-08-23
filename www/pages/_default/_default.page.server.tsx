import fs from "fs";
import { resolve } from "path";
import ReactDOMServer from "react-dom/server";
import { html } from "vite-plugin-ssr";
// import { log } from "src/log";
import { renderDynamicComponents } from "src/render-dynamic-components";
import { components } from "components/components";
import { PageContext } from "./types";
import { PageLayout } from "./PageLayout";
import { homepage } from "../../package.json";

const { readFile } = fs.promises;

// See https://github.com/brillout/vite-plugin-ssr#data-fetching
export const passToClient = ["pageProps"];

export const render = async (pageContext: PageContext): any => {
  const {
    Page,
    pageProps,
    contextProps: { locale },
  } = pageContext;

  let content;

  if (pageProps.error) {
    const errors = {
      NOT_FOUND: "not-found.json",
    };

    try {
      const errorPath = resolve("..", "canrau.com_CONTENT", locale, errors[pageProps.error]);
      const rawFile = await readFile(errorPath, {
        encoding: "utf-8",
      });
      content = renderDynamicComponents(JSON.parse(rawFile).content, components);
    } catch {
      console.log(`Couldn't read error file ${pageProps.error}`);
    }
  } else {
    try {
      const file = JSON.parse(pageProps?.file);
      content = renderDynamicComponents(file?.content, components);
    } catch {
      content = `_default.server Couldn't parse ${pageProps?.file}`;
    }
  }
  // console.log({defaultTheme})
  const pageHtml = ReactDOMServer.renderToString(
    <PageLayout>
      <Page {...pageProps}>{content}</Page>
    </PageLayout>
  );

  // See https://github.com/brillout/vite-plugin-ssr#html-head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || "canrau.com";
  const desc = (documentProps && documentProps.description) || "App using Vite + vite-plugin-ssr";
  const canonical: string = (homepage + pageProps.path) as string;
  // <link rel="icon" href="${logoUrl}" />
  // todo: make body classes dynamic to reflect theme
  // html lang https://www.w3.org/International/questions/qa-html-language-declarations.en
  return html`<!DOCTYPE html>
    <html lang="${locale}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <meta name="description" content="${desc}" />
        <link
          rel="canonical"
          href="${canonical /* TODO: get canonical URL from content itself */}"
        />
      </head>
      <body class="bg-nord0">
        <div id="page-view">${html.dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
};
