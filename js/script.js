/*	Author:
		Zander Martineau
*/

/* ==========================================================================
   Micro libraries
   * Bean    : Events API          - https://github.com/fat/bean
   * Bonzo   : DOM utility         - https://github.com/ded/bonzo
   * Qwery   : CSS Selector engine - https://github.com/ded/qwery
   * domReady: Obvious             - https://github.com/ded/domready
   * lodash  : Utility library     - http://lodash.com/
   * reqwest : Ajax                - https://github.com/ded/Reqwest
   ========================================================================== */


// Create a closure to maintain scope of the '$' and remain compatible with other frameworks
;(function(ZANDER) {

	domready(function () {
		ZANDER.SiteSetup.init();
	});// END DOC READY

	ZANDER.SiteSetup = {
		navClosed : true,

		init : function () {
			ZANDER.ui.init();
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

	ZANDER.ui = {
		logo : document.querySelector('.zm-logo'),
		masthead : document.querySelector('.masthead'),
		mastheadContent : document.querySelector('.masthead-content'),
		heroUnit : document.querySelector('.hero-unit'),

		navDocked : false,


		init : function() {
			var self = this;
			ZANDER.ui.navigationToggle();
			ZANDER.ui.navStickOnScroll();
			// ZANDER.ui.shotSwitch();
		},

		navigationToggle : function() {
			ZANDER.ui.logo.addEventListener('click', function(e) {
				if ( ZANDER.SiteSetup.navClosed === true ) {
					ZANDER.ui.openNav();
					console.log('open nav');
				} else {
					ZANDER.ui.closeNav();
					console.log('close nav');
				}
			});
		},

		openNav : function() {
			_gaq.push(['_trackEvent', 'Navigation', 'Opened']);
			var mastheadContentHeight = ZANDER.ui.mastheadContent.scrollHeight;
			ZANDER.ui.mastheadContent.style[height] = mastheadContentHeight;
			ZANDER.ui.logo.classList.add('is-active');
			ZANDER.SiteSetup.navClosed = false;
		},

		closeNav : function() {
			ZANDER.ui.mastheadContent.style[height] = 0;
			ZANDER.ui.logo.classList.remove('is-active');
			ZANDER.SiteSetup.navClosed = true;
		},

		/**
		 * Change the height of the items proportionally based on the width of the viewport
		 */
		navStickOnScroll : function() {
			var navOffset = ZANDER.ui.masthead.offsetTop;

			document.addEventListener('scroll', function(event) {
				var scrollTop = window.scrollY;
				//console.log(scrollTop, navOffset, navOffset - scrollTop);

				if (!ZANDER.ui.navDocked && (navOffset - scrollTop < 0)) {
					ZANDER.ui.masthead.classList.add('stuck');
					ZANDER.ui.navDocked = true;
					console.log(ZANDER.ui.heroUnit.style);
					ZANDER.ui.heroUnit.style[marginBottom] = ZANDER.ui.masthead.scrollHeight;
				} else if (ZANDER.ui.navDocked && (navOffset - scrollTop >= 0) ) {
					ZANDER.ui.masthead.classList.remove('stuck');
					ZANDER.ui.heroUnit.style[marginBottom] = 0;
					ZANDER.ui.navDocked = false;
				}

				if ( !ZANDER.SiteSetup.navClosed ) {
					ZANDER.ui.closeNav();
					ZANDER.SiteSetup.navClosed = true;
				}
			});
		},


		/**
		 * Simple carousel
		 */
		shotSwitch : function() {
			var
				regex         = /(shot-[0-9])/g,
				regexNoNumber = /(shot-)/g
			;

			// .layout-desktop-three-up
			$('#main').on('.layout-desktop-three-up figure', 'click', function(event) {
				var $this = $(this),
					$allSiblings = $this.siblings('.shot-visible').andSelf(),
					allSiblingsCount = $allSiblings.length - 1
				;

					if ( $this.hasClass('shot-1') ) {
						// console.log('do nothing');
						return false;
					} else if ( $this.hasClass('shot-2') ) {

						$allSiblings.each(function(i) {
							var number = parseInt( $(this).data('index') , 10 );
							// console.log('number: ' + number );
							var
								className    = 'shot-' + i,
								incClassName
							;

							if ( number >= allSiblingsCount  ) {
								number = 0;
								incClassName = 'shot-' + number;
							} else {
								number++;
								incClassName = 'shot-' + number;
							}

							$(this).removeClass().addClass(incClassName).addClass('shot-visible').data('index', number);
						});

						// console.log('next');
					} else {

						$allSiblings.each(function(i) {
							var number = parseInt( $(this)[0].className.match(/shot-(\d+)/)[1] , 10);
							// console.log('number: ' + number );
							var
								className    = 'shot-' + i,
								incClassName
							;

							if ( number === 0  ) {
								number = 2;
								incClassName = 'shot-' + number;
							} else {
								number--;
								incClassName = 'shot-' + number;
							}

							$(this).removeClass().addClass(incClassName).addClass('shot-visible');
						});

						console.log('prev');
					}

			});

			// .layout-desktop-two-up
			$('#main').on('.layout-desktop-two-up figure', 'click', function(event) {

				if ( $(this).hasClass('shot-1') ) {
					// Move 1>0
					$(this).addClass('shot-0').removeClass('shot-1')
					// Move 1>0
					.siblings('.shot-0').removeClass('shot-0').addClass('shot-1');

				} else {
					// Move 0>1
					$(this).removeClass('shot-0').addClass('shot-1')
					// Move 1>0
					.siblings('.shot-1').removeClass('shot-1').addClass('shot-0');
				}
			});
		},


		/**
		 * Change the height of the items proportionally based on the width of the viewport
		 */
		getShotsHeight : function(){

		},

		shotHeight : function() {
			/**
			 * Change the height of the items proportionally based on the width of the viewport
			 */
			$('#main').on('.layout-stacked figure', 'click', function(event) {
				var $parent    = $(this).parent(),
					$shotHeight = $parent[0].scrollHeight
				;
				console.log($parent);
				console.log($shotHeight);

				if ( $parent.hasClass('is-expanded') ) {
					$parent.removeClass('is-expanded')
					.parent().css('paddingBottom', 0);
				} else {
					$parent.addClass('is-expanded')
					.parent().css('paddingBottom', '4%');
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