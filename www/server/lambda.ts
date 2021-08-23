import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createPageRender } from "vite-plugin-ssr";
// import * as vite from "vite";
// import * as fs from "fs";
// import { join } from "path";
// import helmet from "helmet";
// import { cspHashes } from "@vitejs/plugin-legacy";

// require("vite-plugin-ssr"); // just for testing purposes

import "../dist/server/importBuild"; // extension necessary?

// const root = `${__dirname}/..`;

// type StaticFileHandlerProps = {
//   url: string;
//   isBase64Encoded: boolean;
// };
// const staticFileHandler = async ({
//   url,
//   isBase64Encoded,
// }: StaticFileHandlerProps): Promise<string | Error> =>
//   new Promise((resolve, reject) => {
//     const buf: any = [];
//     const stream = fs.createReadStream(join(root, "dist", "client", url));
//     stream.on("error", (err) => {
//       reject(err);
//     });
//     stream.on("open", () => {});
//     stream.on("data", (chunk) => buf.push(chunk));
//     stream.on("end", () => {
//       const bodyBuffer = Buffer.concat(buf);
//       resolve(bodyBuffer.toString(isBase64Encoded ? "base64" : "utf8"));
//     });
//   });

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult | undefined> => {
  const url = event.path;
  if (event.httpMethod.toLowerCase() === "get") {
    // if (/\.{css|js(on)?}$/.test(url)) {}
    // const staticFile = await staticFileHandler({ url, isBase64Encoded: event.isBase64Encoded });

    // if (typeof staticFile === "string") {
    //   return {
    //     statusCode: 200,
    //     body: staticFile,
    //     isBase64Encoded: event.isBase64Encoded,
    //   };
    // }

    const renderPage = createPageRender({ isProduction: true });

    console.log("SERVER req.originalUrl", { url });
    const rawSlug = url.replace(/^\/+|\/+$/g, "");
    const [locale, ...slugParts] = rawSlug.split("/");
    const slug = slugParts.join("/");
    console.log({ url, slug, slugParts, locale });
    // todo: how to ensure slug part is a locale & supported?
    // todo: MAYBE move all DB logic in here?
    // https://en.wikipedia.org/wiki/IETF_language_tag
    // https://www.ietf.org/rfc/bcp/bcp47.txt "en"/"de" = simple language subtag
    const contextProps: {
      errors: string[];
      url: string;
      locale: string;
      slug: string;
      slugParts: string[];
    } = { url, locale, slug, slugParts, errors: [] };
    if (slugParts.length < 1) {
      // todo: redirect to browser language or sthg
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
      // if redirectTo
    }

    // if (result?.renderResult?.redirectTo) {
    //   res.redirect(307, "/movie/add");
    // } else {
    return {
      statusCode: result.statusCode,
      body: result.renderResult as string,
    };
    // }
  }

  return {
    statusCode: 404,
    body: "<h1>404</h1>",
    isBase64Encoded: false,
  };
  // more at https://content-security-policy.com/
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: {
  //       directives: {
  //         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  //         "script-src": [
  //           "self",
  //           // !isProduction && "unsafe-inline",
  //           ...cspHashes.map((s) => `sha256-${s}`),
  //         ],
  //       },
  //     },
  //   })
  // );
};
