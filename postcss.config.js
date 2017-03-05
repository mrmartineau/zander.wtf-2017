module.exports = {
	plugins: [
		require('postcss-easings'), // https://github.com/postcss/postcss-easings
		require('postcss-easy-import'), // https://github.com/trysound/postcss-easy-import
		require('postcss-mixins'), // https://github.com/postcss/postcss-mixins
		require('postcss-advanced-variables'), // https://github.com/jonathantneal/postcss-advanced-variables
		require('postcss-custom-properties'), // https://github.com/postcss/postcss-custom-properties
		// require('lost'), // http://lostgrid.org/docs.html
		// require('postcss-utilities'), // https://github.com/ismamz/postcss-utilities
		require('postcss-compact-mq'), // https://github.com/rominmx/postcss-compact-mq
		require('postcss-modular-scale'), // https://github.com/kristoferjoseph/postcss-modular-scale
		require('postcss-nested'), // https://github.com/postcss/postcss-nested
		require('postcss-nested-ancestors'), // https://github.com/toomuchdesign/postcss-nested-ancestors
		// require('postcss-reporter')({clearReportedMessages: true}), // https://github.com/postcss/postcss-reporter
		require('autoprefixer')({ browsers: ['> 1% in US', 'last 2 versions', 'iOS > 8'] }), // https://github.com/postcss/autoprefixer
	]
}
