var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

// https://github.com/petehunt/webpack-howto#6-feature-flags
// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.

// if (__DEV__) {
//   console.warn('Extra logging');
// }
// // ...
// if (__PRERELEASE__) {
//   showSecretFeature();
// }

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
				loader: ExtractTextPlugin.extract('style-loader?sourceMap', 'css-loader', 'autoprefixer-loader?browsers=ie 6-8')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader?sourceMap', 'css-loader!sass-loader')
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
		})
	],

	devtool: 'sourcemap',

	postcss: function () {
		return [autoprefixer, precss];
	}
};
