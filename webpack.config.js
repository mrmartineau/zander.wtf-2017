const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: "source-map",
	entry: {
		kickoff: [path.resolve('assets/js', 'script.js')],
		styleguide: [path.resolve('assets/js', 'styleguide.js')],
	},
	output: {
		path: path.resolve('build'),
		filename: '[name].js',
		publicPath: '/'
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
		new ExtractTextPlugin("[name].css"),
	]
};
