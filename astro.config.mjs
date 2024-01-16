import { defineConfig } from "astro/config";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";

import solid from "@astrojs/solid-js";

export default defineConfig({
  integrations: [icon(), solid()],
  output: "hybrid",
  adapter: vercel(),
});
