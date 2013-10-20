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

		$('#masthead').height( this.viewportHeight() );

		var getViewPortHeight = function getViewPortHeight() {
			var viewportHeight = $(window).height() - 300;
			return viewportHeight;
		};
	},

	navigationToggle : function() {
		$('body').on('click', '.navvy', function(event) {
			event.preventDefault();

			if ( ZANDER.SiteSetup.navClosed === true ) {
				ZANDER.ui.openNav();
				ZANDER.SiteSetup.navClosed = false;
			} else {
				ZANDER.ui.closeNav();
				ZANDER.SiteSetup.navClosed = true;
			}
		});
	},

	openNav : function() {
		$('.masthead').slideDown('fast');
		$('.navvy').addClass('is-active');
	},

	closeNav : function() {
		$('.masthead').slideUp('fast');
		$('.navvy').removeClass('is-active');
	},

	scroll : function() {
		// TODO: Close nav on scroll
		$(window).scroll(function(event) {
			if ( ZANDER.SiteSetup.navClosed === false ) {
				log('Close nav on scroll');

				ZANDER.ui.closeNav();
				ZANDER.SiteSetup.navClosed = true;
			}
		});
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

			log('allSiblingsCount: ' + allSiblingsCount);

				if ( $this.hasClass('shot-1') ) {
					log('do nothing');
					return false;
				} else if ( $this.hasClass('shot-2') ) {

					$allSiblings.each(function(i) {
						var number = parseInt( $(this).data('index') , 10 );
						log('number: ' + number );
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