import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as SSR from "vite-plugin-ssr";

import "../dist/server/importBuild";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult | undefined> => {
  const url = event.path;
  if (event?.httpMethod?.toLowerCase() === "get") {
    const renderPage = SSR.createPageRender({ isProduction: true });

    const rawSlug = url.replace(/^\/+|\/+$/g, "");
    const [locale, ...slugParts] = rawSlug.split("/");
    const slug = slugParts.join("/");

    const contextProps: {
      errors: string[];
      url: string;
      locale: string;
      slug: string;
      slugParts: string[];
    } = { url, locale, slug, slugParts, errors: [] };
    if (slugParts.length < 1) {
      contextProps.errors = [...(contextProps.errors ?? []), "ERROR_LANGUAGE_MISSING"];
    }
    const result = await renderPage({ url, contextProps });

    // 404 / Error handling https://github.com/brillout/vite-plugin-ssr/issues/103
    if (result.nothingRendered) {
      return {
        statusCode: 404,
        body: "<h1>404</h1>",
        isBase64Encoded: false,
      };
    }

    return {
      statusCode: result.statusCode,
      body: result.renderResult as string,
    };
  }

  return {
    statusCode: 404,
    body: "<h1>404</h1>",
    isBase64Encoded: false,
  };
};
