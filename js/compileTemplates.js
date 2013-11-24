/*	Author: Zander Martineau
*/


// Create a closure to maintain scope of the '$' and remain compatible with other frameworks
;(function(ZANDER) {

	domready(function () {
		ZANDER.SiteSetup.init();
	});// END DOC READY

	ZANDER.SiteSetup = {
		init : function () {
			ZANDER.SiteSetup.getData();
		},

		getData : function() {
			// console.log('getData() & cache it');

			// TODO: Check if data is in localstorage
			reqwest({
				url : '/data.json',
				type : 'json',
				// method: 'post',
				success : function( data ) {
					ZANDER.data = data;
					console.log(data);
					if ( window.localStorage ) {
						localStorage.setItem('data', JSON.stringify(data));
					}
					// var retrievedObject = localStorage.getItem('data');
					// console.log('retrievedObject: ', JSON.parse(retrievedObject));

					// ZANDER.ui.shotHeight();

					ZANDER.tpl.listing('home', '#main');
					console.log('Home page');
				},

				error : function(resp) {
					console.error('error!', resp);
				}
			});
		}
	};

	ZANDER.tpl = {
		init : function() {
			ZANDER.tpl.projectList();
		},

		listing : function(tpl, el) {
			var template = ZANDER.helpers.template(tpl);

			// Handlebars.registerHelper('iter', function(context, options) {
			// 	var fn = options.fn, inverse = options.inverse;
			// 	var ret = '';

			// 	if(context && context.length > 0) {
			// 		for(var i=0, j=context.length; i<j; i++) {
			// 			ret = ret + fn($.extend({}, context[i], { i: i, iPlus1: i + 1 }));
			// 		}
			// 	} else {
			// 		ret = inverse(this);
			// 	}
			// 	return ret;
			// });

			// Handlebars.registerHelper('ifz', function(conditional, check, options) {
			// 	if(conditional === check) {
			// 		return options.fn(this);
			// 	} else {
			// 		return options.inverse(this);
			// 	}
			// });
			//

			console.log(el);
			document.querySelector(el).innerHTML = template(ZANDER.data);
			// $(el).html(template(ZANDER.data));
		}
	};

	ZANDER.helpers = {
		template : function(name) {
			var tplName = document.getElementById(name + '-tpl');
			return Handlebars.compile( tplName.innerHTML );
		}
	};

})(window.ZANDER = window.ZANDER || {});