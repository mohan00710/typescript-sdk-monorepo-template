import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tsconfigPaths()],
  cacheDir: "../../node_modules/.vite",
  esbuild: {
    format: "esm",
    target: "esnext",
  },
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.spec.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["**/index.ts"],
    },
  },
})
