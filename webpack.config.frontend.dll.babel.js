import path from 'path';
import webpack from 'webpack';

import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';

const reactVendors = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-actions',
    'redux-saga',
    'reselect',
];

export default {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname),
    entry: {
        react: reactVendors,
    },
    output: {
        path: path.resolve(__dirname, 'frontend/dist/dll/'),
        filename: '[name]_dll.js',
        library: '[name]_dll',
    },
    plugins: [
        new ProgressBarWebpackPlugin(),
        // Output manifest json file for each generated dll reference file
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'frontend/dist/dll/[name]_manifest.json'),
            name: '[name]_dll',
        }),
    ],

    // Turn off performance hints (assets size limit)
    performance: {
        hints: false,
    },
};