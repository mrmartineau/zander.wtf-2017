var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


var browserslist = '["> 5%", "last 2 versions", "firefox > 3.6", "ie > 7"]';

// https://github.com/petehunt/webpack-howto#6-feature-flags
// if (__DEV__)
// if (__PRERELEASE__)

module.exports = {
	entry: './js/zander.js',

	output: {
		path: __dirname,
		filename: 'js/dist/zander.js'
	},

	resolve: {
		extensions: ['', '.js', '.json', '.scss']
	},

	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize&sourceMap!autoprefixer-loader?{browsers:'+ browserslist +'}')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize&sourceMap!autoprefixer-loader?{browsers:'+ browserslist +'}!sass-loader?sourceMap')
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('css/kickoff.css', {
			publicPath: '/css/',
			allChunks: true
		}),
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
			__PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
		}),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: ['_site']
			},
			files: ["_site/*.css", "_site/js/*.js"]
		})
	],

	devtool: 'sourcemap'
};
