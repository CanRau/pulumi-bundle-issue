import express from "express";
import https from "https";
import chalk from "chalk";
// import helmet from "helmet";
import { createPageRender } from "vite-plugin-ssr";
import * as vite from "vite";
// import { cspHashes } from "@vitejs/plugin-legacy";
import mkcert from "vite-plugin-mkcert";

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

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

      plugins: [
        mkcert({
          source: "coding",
        }),
      ],
    });
    app.use(viteDevServer.middlewares);
  }

  const renderPage = createPageRender({ viteDevServer, isProduction, root });

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    const contextProps = {};
    const result = await renderPage({ url, contextProps });
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

  const port = 3000;
  // app.listen(port);
  // console.log(`Server running at http://localhost:${port}`);

  const httpsServer = https.createServer(
    {
      key: viteDevServer?.config?.server?.https?.key,
      cert: viteDevServer?.config?.server?.https?.cert,
    },
    app
  );

  httpsServer.listen(port, () => {
    // eslint-disable-next-line
    console.log(chalk.yellow`Server running at https://localhost:${port}`);
  });
}

startServer();
