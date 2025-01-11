import { defineConfig } from "vite";
export default defineConfig({
    build: {
        manifest: true,
    },
    esbuild: {
        jsx: "automatic",
        jsxImportSource: "vdom3r",
        jsxFactory: "jsx",
        jsxFragment: "Fragment",
    },
});
