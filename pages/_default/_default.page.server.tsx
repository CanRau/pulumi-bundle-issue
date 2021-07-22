import ReactDOMServer from "react-dom/server";
import { html } from "vite-plugin-ssr";
import { PageContext } from "./types";
import { PageLayout } from "./PageLayout";

export { render };
export { passToClient };

// See https://github.com/brillout/vite-plugin-ssr#data-fetching
const passToClient = ["pageProps"];

function render(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  const pageHtml = ReactDOMServer.renderToString(
    <PageLayout>
      <Page {...pageProps} />
    </PageLayout>
  );

  // See https://github.com/brillout/vite-plugin-ssr#html-head
  const { documentProps } = pageContext;
  const lang = "en";
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    (documentProps && documentProps.description) ||
    "App using Vite + vite-plugin-ssr";

  // <link rel="icon" href="${logoUrl}" />
  return html`<!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${html.dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}
