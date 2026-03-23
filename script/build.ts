import { build } from "esbuild";
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";

// Ensure dist directory exists
if (!existsSync("dist")) {
  mkdirSync("dist", { recursive: true });
}

// Build the React client with Vite
console.log("Building client...");
execSync("npx vite build", { stdio: "inherit" });

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
