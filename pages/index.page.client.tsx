import React from "react";
import ReactDOM from "react-dom";
import { getPage } from "vite-plugin-ssr/client";
import { log } from "src/log";
import { components } from "src/components/components";
import { renderDynamicComponents } from "src/render-dynamic-components";
import { PageLayout } from "./_default/PageLayout";

async function hydrate() {
  const pageContext = await getPage();
  const { Page, pageProps } = pageContext;

  let file;
  try {
    file = JSON.parse(pageProps.file);
  } catch {
    log(`.client Couldn't parse ${pageProps.file}`);
    pageProps.error = `Sorry we've got a problem displaying this site`;
  }

  ReactDOM.hydrate(
    <PageLayout>
      <Page {...pageProps}>{renderDynamicComponents(file.content, components)}</Page>
    </PageLayout>,
    document.getElementById("page-view")
  );
}

hydrate();
