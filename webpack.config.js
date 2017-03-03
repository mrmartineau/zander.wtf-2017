const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
	devtool: "source-map",
	entry: {
		kickoff: [path.resolve('assets/scss', 'kickoff.scss')],
		styleguide: [path.resolve('assets/scss', 'styleguide.scss')],
	},
	output: {
		path: path.resolve('build'),
		filename: '[name].css',
		publicPath: '/'
	},
	module: {
		// rules: [{
  //           test: /\.scss$/,
  //           use: [{
  //               loader: "style-loader"
  //           }, {
  //               loader: "css-loader", options: {
  //                   sourceMap: true
  //               }
  //           }, {
  //               loader: "sass-loader", options: {
  //                   sourceMap: true
  //               }
  //           }]
  //       }]

		rules: [{
			test: /\.scss$/,
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
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
							plugins: () => [
								autoprefixer({ browsers: ['> 1% in US', 'last 2 versions', 'iOS > 8'] })
							]
						}
					},
					{
						loader: 'resolve-url-loader',
				  },
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			})
		}]

	},
	plugins: [
		new ExtractTextPlugin("[name].css"),
	]
};
