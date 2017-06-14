const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PUBLIC_PATH = 'https://zander.wtf/';

module.exports = {
	devtool: "source-map",

	entry: {
		kickoff: [path.resolve('assets/js', 'script.js')],
		styleguide: [path.resolve('assets/js', 'styleguide.js')],
	},

	output: {
		path: path.resolve('build'),
		filename: '[name].js',
		publicPath: PUBLIC_PATH
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
				},
			},
			{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: "style-loader",
				loader: [
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							importLoaders: 1,
						}
					},
					// {
					// 	loader: 'resolve-url-loader',
				 //  },
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
						}
					},
				]
			})
		}]

	},
	plugins: [
		new ExtractTextPlugin("[name].css"), // Extract to CSS file
		new SWPrecacheWebpackPlugin(
			{
				cacheId: 'Zander-Martineau',
				dontCacheBustUrlsMatching: /\.\w{8}\./,
				filename: 'service-worker.js',
				minify: false,
				navigateFallback: `${PUBLIC_PATH}index.html`,
				staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
				mergeStaticsConfig: true,
				staticFileGlobs: [
					`${PUBLIC_PATH}index.html`,
					'/index.html',
					'./',
					'/offline/index.html',
					'/build/img/**.*',
					'/build/*.css',
					'/build/*.js',
				],
			}
		),
	]
};
