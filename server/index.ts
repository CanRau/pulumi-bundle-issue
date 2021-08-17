import express from "express";
import http from "http";
import https from "https";
import chalk from "chalk";
import { createPageRender } from "vite-plugin-ssr";
import * as vite from "vite";
import { log } from "../src/log";
// import helmet from "helmet";
// import { cspHashes } from "@vitejs/plugin-legacy";

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

// https://github.com/brillout/vite-plugin-ssr/issues/127#issuecomment-893733307
if (!isProduction) {
  Error.stackTraceLimit = Infinity;
}

async function startServer() {
  const app = express();

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

  let viteDevServer;
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`, { index: false }));
  } else {
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true, https: true },
    });
    app.use(viteDevServer.middlewares);
  }

  const renderPage = createPageRender({ viteDevServer, isProduction, root });

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    log("SERVER req.originalUrl", { url });
    const rawSlug = url.replace(/^\/+|\/+$/g, "");
    const [locale, ...slugParts] = rawSlug.split("/");
    const slug = slugParts.join("/");
    log({ url, slug, slugParts, locale });
    // todo: how to ensure slug part is a locale & supported?
    // todo: MAYBE move all DB logic in here?
    // https://en.wikipedia.org/wiki/IETF_language_tag
    // https://www.ietf.org/rfc/bcp/bcp47.txt "en"/"de" = simple language subtag
    const contextProps = { url, locale, slug, slugParts };
    if (slugParts.length < 1) {
      // todo: redirect to browser language or sthg
      contextProps.errors = [...(contextProps.errors ?? []), "ERROR_LANGUAGE_MISSING"];
    }
    const result = await renderPage({ url, contextProps });
    // 404 / Error handling https://github.com/brillout/vite-plugin-ssr/issues/103
    if (result.nothingRendered) {
      return next();
      // if redirectTo
    }

    if (result?.renderResult?.redirectTo) {
      res.redirect(307, "/movie/add");
    } else {
      res.status(result.statusCode).send(result.renderResult);
    }

    return null;
  });

  const port = isProduction ? 8080 : 3000;

  // app.listen(port);
  // return log(`Server running at http://localhost:${port}`);

  const server = isProduction
    ? http.createServer(app)
    : https.createServer(
        {
          key: viteDevServer?.config?.server?.https?.key,
          cert: viteDevServer?.config?.server?.https?.cert,
        },
        app
      );

  server.listen(port, () => {
    const protocol = isProduction ? "http" : "https";
    // eslint-disable-next-line no-console
    log(chalk.yellow`Server running at ${protocol}://localhost:${port}`);
  });
}

startServer();
