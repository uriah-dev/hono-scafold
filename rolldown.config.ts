import { defineConfig } from "rolldown";
import resolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/main.ts",
  platform: "node",
  plugins: [resolve()],
  output: {
    file: "dist/server.js",
  },
});
