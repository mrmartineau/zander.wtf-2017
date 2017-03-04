const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	devtool: "source-map",
	entry: {
		kickoff: [path.resolve('assets/js', 'script.js')],
		// styleguide: [path.resolve('assets/postcss', 'styleguide.css')],
	},
	output: {
		path: path.resolve('build'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		// rules: [{
		// 	test: /\.css$/,
		// 	use: [
		// 		{
		// 			loader: "style-loader"
		// 		},
		// 		{
		// 			loader: "css-loader", options: {
		// 				sourceMap: true,
		//         importLoaders: 1,
		// 			}
		// 		},
		// 		// {
		// 		// 	loader: 'resolve-url-loader',
		// 		// },
		// 		{
		// 			loader: "postcss-loader", options: {
		// 				sourceMap: true
		// 			}
		// 		}
		// 	]
		// }]

		rules: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: "style-loader",
				loader: [
					// {
					// 	loader: "style-loader"
					// },
					{
						loader: "css-loader",
						options: {
							sourceMap: true
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
