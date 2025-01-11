import { defineConfig } from "tsup";
import path from "path";
import { globSync } from "glob";
// Get all TypeScript files from src directory
const entryPoints = globSync("src/**/*.{ts,tsx}", {
    ignore: ["src/**/*.test.ts", "src/**/*.spec.ts", "src/**/__tests__/*"],
});

// Convert file paths to entry point format
const entries = Object.fromEntries(
    entryPoints.map((file) => [
        // Remove `src/` and file extension from path
        path.relative("src", file.slice(0, file.lastIndexOf("."))),
        file,
    ]),
);
export default defineConfig({
    entry: entries,
    format: ["esm", "cjs", "iife"],
    dts: true,
    splitting: false,
    clean: true,
    minify: true,
    sourcemap: true,
    outDir: "dist",
    target: "es2020",
    platform: "browser",
    external: ["react"],
    globalName: "vdom3r",
    esbuildOptions(options) {
        options.footer = {
            js: `if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = dom4t; }`,
        };
    },
    outExtension({ format }) {
        return {
            js:
                format === "cjs"
                    ? ".cjs"
                    : format === "iife"
                      ? ".global.js"
                      : ".mjs",
        };
    },
});
