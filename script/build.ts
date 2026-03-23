import { build } from "esbuild";
import { existsSync, mkdirSync } from "fs";

// Ensure dist directory exists
if (!existsSync("dist")) {
  mkdirSync("dist", { recursive: true });
}

// Bundle the Express server with esbuild
console.log("Building server...");
await build({
  entryPoints: ["server/index.ts"],
  outfile: "dist/index.cjs",
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  packages: "external",
  sourcemap: true,
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

console.log("Build complete.");
