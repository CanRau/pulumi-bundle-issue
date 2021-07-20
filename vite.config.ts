import { UserConfig, UserConfigFn } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import legacy from "@vitejs/plugin-legacy";
import tsconfigPaths from "vite-tsconfig-paths";
import reactJsx from "vite-react-jsx";
import WindiCSS from "vite-plugin-windicss";
import { visualizer } from "rollup-plugin-visualizer";
import mkcert from "vite-plugin-mkcert";
import ssr from "vite-plugin-ssr/plugin";
import ViteRestart from "vite-plugin-restart";

const defineConfig: UserConfigFn = ({ mode }) => {
  const config: UserConfig = {
    server: {
      https: true,
    },
    plugins: [
      WindiCSS(),

      // consider
      // https://github.com/anncwb/vite-plugin-compression
      // vite-plugin-purge-icons at https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
      // https://github.com/antfu/vite-plugin-pwa
      // https://github.com/SasanFarrokh/vite-plugin-multi-device
      // imagetools https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite

      reactRefresh(),
      tsconfigPaths(),
      legacy(),
      reactJsx(),
      mkcert({
        source: "coding",
      }),
      ssr(),
      ViteRestart({
        restart: ["server"],
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
          },
        },
      },
    },
  };
  if (mode === "analyze") {
    config.plugins.push(
      visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }
  return config;
};

export default defineConfig;
