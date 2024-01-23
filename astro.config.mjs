import { defineConfig } from "astro/config";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), solid()],
  output: "server",
  adapter: vercel(),
});
