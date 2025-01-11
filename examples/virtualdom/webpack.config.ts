import path from "path";
import { Configuration } from "webpack";
const config: Configuration & {
    devServer: {};
} = {
    target: "web",
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: 3000,
        hot: true,
        historyApiFallback: true,
        devMiddleware: {
            publicPath: "/",
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(?:js|mjs|cjs|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
            // Update this to match your import path
            "jsx-runtime": path.resolve(__dirname, "src"),
            createElement: path.resolve(__dirname, "src/lib/render.ts"), // Alias to point to your custom createElement file
        },
    },
    output: {
        module: true,
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    experiments: {
        outputModule: true,
    },
};

export default config;
