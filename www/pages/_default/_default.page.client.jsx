import ReactDOM from "react-dom";
import React from "react";
import { getPage } from "vite-plugin-ssr/client";
import { PageLayout } from "./PageLayout";

async function hydrate() {
  const pageContext = await getPage();
  const { Page, pageProps } = pageContext;
  ReactDOM.hydrate(
    <PageLayout>
      <Page {...pageProps} />
    </PageLayout>,
    document.getElementById("page-view")
  );
}

hydrate();
