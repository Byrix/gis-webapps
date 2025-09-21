// @ts-check
import { defineConfig, envField } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import react from '@astrojs/react';
import cesium from 'vite-plugin-cesium';
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

const cesiumSource = 'node_modules/cesium/Build/Cesium';
const cesiumBaseUrl = 'cesiumStatic';

// https://astro.build/config
export default defineConfig({
  site: "https://byrix.github.io/webapps/sitemap-index.xml",
  integrations: [icon(), react(), sitemap()],

  vite: {
    define: {
      CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
    },
    plugins: [
      tailwindcss(), 
      cesium(),
      viteStaticCopy({
        targets: [
          { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl }
        ]
      })
    ],
  },

  env:{
    schema: {
      CESIUM_TOKEN: envField.string({ context: "client", access: "public" }),
      // PG_HOST: envField.string({ context: "server", access: "secret" }),
      // PG_USER: envField.string({ context: "server", access: "secret" }),
      // PG_PASSWORD: envField.string({ context: "server", access: "secret" }),
      WEATHER_TOKEN: envField.string({ context: "client", access: 'public' }),
    }
  },

  adapter: node({
    mode: "standalone"
  })
});
