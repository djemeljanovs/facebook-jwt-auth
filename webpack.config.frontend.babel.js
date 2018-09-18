import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import ProgressBarWebpackPlugin from "progress-bar-webpack-plugin";
import { DllReferencePlugin } from "webpack";

import cssnano from "cssnano";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";

const ReactManifest = './frontend/dist/dll/react_manifest.json';

const devMode = process.env.NODE_ENV !== 'production';

export default {
    context: path.resolve(__dirname),
    mode: process.env.NODE_ENV || 'development',
    target: "web",
    entry: './frontend/src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'frontend/dist'),
        filename: '[name].[hash:10].js',
        chunkFilename: '[name].[hash:10].js',
    },
    resolve: {
        extensions: [ '.ts', '.tsx', ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useBabel: true,
                            useCache: true,
                            silent: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !devMode,
                            importLoaders: 1,
                        },
                    }, // TODO: enable sourceMap in devMode without FOUC
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [postcssImport, postcssPresetEnv, cssnano],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|tiff)(\?.*)?$/,
                use: [
                    { loader: 'url-loader', options: { limit: 10000, name: '[name].[hash:7].[ext]' } },
                    { loader: 'image-webpack-loader', options: { disable: devMode } },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ]
    },
    devServer: {
        // Port number for webpack dev server
        port: 3004,
        // Add proxy for api call
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true,
            },
        },
        // Automatically open page
        open: true,
        historyApiFallback: true,
    },
    devtool: 'inline-source-map',
    plugins: [
        new ProgressBarWebpackPlugin(),
        new DuplicatePackageCheckerPlugin(),
        new DllReferencePlugin({ manifest: ReactManifest }),
        // Generate html file to dist folder
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'frontend/public/index.html')
        }),
        // Add dll reference files to html
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'frontend/dist/dll/*_dll.js'),
            includeSourcemap: false,
        }),
        // Copy static files to build dir
        new CopyWebpackPlugin([
            {
                from: 'frontend/public/**/*',
                to: '[name].[ext]',
                ignore: ['index.html'],
            },
        ]),
    ]
}
