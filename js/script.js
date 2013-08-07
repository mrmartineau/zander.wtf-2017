/*	Author:
		TMW - (Author Name Here)
*/

// =========================================
// === Declare global 'ZANDER' namespace ===
// =========================================
var ZANDER = window.ZANDER || {};

// Create a closure to maintain scope of the '$' and remain compatible with other frameworks
(function($) {

	$(function() {

		ZANDER.SiteSetup.init();

	});// END DOC READY

})(jQuery);


ZANDER.SiteSetup = {
	navClosed : true,

	init : function () {
		ZANDER.ui.init();
		ZANDER.SiteSetup.getData();
	},

	getData : function() {
		// log('getData() & cache it');

		// TODO: Check if data is in localstorage
		$.ajax({
			url : '/data.json',
			dataType : 'json',
			success : function( data ) {
				// TODO: Save this to localstorage & use it
				ZANDER.data = data;
				log(data);
				if ( window.localStorage ) {
					localStorage.setItem('data', JSON.stringify(data));
				}
				// var retrievedObject = localStorage.getItem('data');
				// console.log('retrievedObject: ', JSON.parse(retrievedObject));

				ZANDER.ui.shotHeight();

				if ( pageName === 'home' ) {
					ZANDER.tpl.listing('home', '#main');
					log('Home page');
				} else if ( pageName === 'cv' ){
					ZANDER.tpl.listing('cv', '#main');
					log('CV page');
				} else if ( pageName === 'sublime' ){
					ZANDER.tpl.listing('sublime', '#main');
					log('Sublime page');
				} else if ( pageName === 'open-source' ){
					ZANDER.tpl.listing('open-source', '#main');
					log('Open source page');
				} else {
					log('Another page');
				}
			},

			error : function() {
				log('error!');
			}
		});
	}
};

ZANDER.ui = {
	init : function() {
		var self = this;
		// self.masthead();
		ZANDER.ui.navigationToggle();
		ZANDER.ui.scroll();
		ZANDER.ui.shotSwitch();
	},

	masthead : function() {

		$('.masthead').height( this.viewportHeight() );

		var getViewPortHeight = function getViewPortHeight() {
			var viewportHeight = $(window).height() - 300;
			return viewportHeight;
		};
	},

	navigationToggle : function() {
		$('body').on('click', '.zm-logo', function(event) {
			event.preventDefault();

			if ( ZANDER.SiteSetup.navClosed === true ) {
				ZANDER.ui.openNav();
				ZANDER.SiteSetup.navClosed = false;
				_gaq.push(['_trackEvent', 'Navigation', 'Opened']);
			} else {
				ZANDER.ui.closeNav();
				ZANDER.SiteSetup.navClosed = true;
			}
		});
	},

	openNav : function() {
		$('.masthead-content').slideDown('fast');
		$('.zm-logo').addClass('is-active');
	},

	closeNav : function() {
		$('.masthead-content').slideUp('fast');
		$('.zm-logo').removeClass('is-active');
	},

	scroll : function() {

		$('.masthead.home').waypoint('sticky');

		$(window).scroll(function(event) {
			if ( ZANDER.SiteSetup.navClosed === false ) {
				// log('Close nav on scroll');

				ZANDER.ui.closeNav();
				ZANDER.SiteSetup.navClosed = true;
			}
		});
	},

	newPage : function() {
		// TODO: Close nav on new page
	},

	shotSwitch : function() {

		function incrementClass(i) {

		}

		var
			regex         = /(shot-[0-9])/g,
			regexNoNumber = /(shot-)/g
		;

		// .layout-desktop-three-up
		$('#main').on('click', '.layout-desktop-three-up figure', function(event) {
			var $this = $(this),
				$allSiblings = $this.siblings('.shot-visible').andSelf(),
				allSiblingsCount = $allSiblings.length - 1
			;

			// log('allSiblingsCount: ' + allSiblingsCount);

				if ( $this.hasClass('shot-1') ) {
					// log('do nothing');
					return false;
				} else if ( $this.hasClass('shot-2') ) {

					$allSiblings.each(function(i) {
						var number = parseInt( $(this).data('index') , 10 );
						// log('number: ' + number );
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

					// log('next');
				} else {

					$allSiblings.each(function(i) {
						var number = parseInt( $(this)[0].className.match(/shot-(\d+)/)[1] , 10);
						// log('number: ' + number );
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

					log('prev');
				}

		});

		// .layout-desktop-two-up
		$('#main').on('click', '.layout-desktop-two-up figure', function(event) {

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

	switchHeight : function() {

	},

	shotHeight : function() {
		$('#main').on('click', '.layout-stacked figure', function(event) {
			var $parent    = $(this).parent(),
				$shotHeight = $parent[0].scrollHeight
			;
			log($parent);
			log($shotHeight);

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

	navigation : function() {
		var template = ZANDER.helpers.template('navigation');
		$('.nav').html( template(ZANDER.data) );
	},

	listing : function(tpl, el) {
		var template = ZANDER.helpers.template(tpl);

		Handlebars.registerHelper('iter', function(context, options) {
			var fn = options.fn, inverse = options.inverse;
			var ret = '';

			if(context && context.length > 0) {
				for(var i=0, j=context.length; i<j; i++) {
					ret = ret + fn($.extend({}, context[i], { i: i, iPlus1: i + 1 }));
				}
			} else {
				ret = inverse(this);
			}
			return ret;
		});

		Handlebars.registerHelper('ifz', function(conditional, check, options) {
			if(conditional === check) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		});

		$(el).html( template(ZANDER.data) );
	},

	projectItem : function(projectName) {
		var template = ZANDER.helpers.template('project-item');
		var context = ZANDER.data.portfolio[projectName];
		log(ZANDER.data.portfolio[projectName]);
		$('#main').html( template(context) );
	},

	footerLinks : function() {
		var template = ZANDER.helpers.template('footer');
		var context = ZANDER.data.info;
		// log(template(context));
		$('#footer .personal-links').html( template(context) );
	}
};

ZANDER.helpers = {
	template : function(name) {
		return Handlebars.compile( $('#'+name+'-tpl').html() );
	}
};