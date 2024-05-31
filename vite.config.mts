// Plugins
import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import federation from "@originjs/vite-plugin-federation";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify(),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    federation({
      name: "remote-app", //name of remote you want to use on host side
      filename: "remoteEntry.js", //filename after the build
      exposes: {
        "./App": "./src/App.vue", //target component you want to serve as remote side. In our case is the entire application
      },
      shared: { vue: { version: "^3.4.27" }, vuetify: { version: "^3.6.7" } },
      // shared: [{ vue: "^3.4.27" }, { vuetify: "^3.6.7" }], //we don't want to build our remote with a library the host side already have. So here we sinalize "hey, use this host side package"
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  build: {
    modulePreload: false,
    target: "esnext",
    // assetsInlineLimit: 40960,
    minify: false,
    cssCodeSplit: false,
    // sourcemap: true,
    // rollupOptions: {
    //   output: {
    //     minifyInternalExports: false,
    //   },
    // },
  },
});
