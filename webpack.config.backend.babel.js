import path from 'path';
import nodeExternals from 'webpack-node-externals';
const NodemonPlugin = require('nodemon-webpack-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');

const config = {
    context: path.resolve(__dirname),
    mode: 'development',
    target: 'node',
    entry: [
        './backend/src/server.ts',
    ],
    devtool: 'inline-source-map',
    resolve: {
        extensions: [ '.ts', '.tsx', '.d.ts', '.js', '.json']
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
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'backend', 'dist'),
        filename: 'bundle.js',
    },
    externals: [nodeExternals()],
    optimization: {
        namedModules: true,
        noEmitOnErrors: true,
    },
    plugins: [
        new FixDefaultImportPlugin(),
        new NodemonPlugin(),
    ]
};

export default config;
