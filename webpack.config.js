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
				exclude: /node_modules/,

				// Inject <style> tag
				// use: [
				// 	'style-loader',
				// 	{
				// 		loader: 'css-loader',
				// 		options: {
				// 			importLoaders: 1
				// 		}
				// 	},
				// 	{
				// 		loader: 'postcss-loader',
				// 		options: {
				// 			sourceMap: 'inline'
				// 		}
				// 	}
				// ]

				// Extract to CSS file
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						'postcss-loader'
					]
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]

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
