/*	Author:
		Zander Martineau
*/

/* ==========================================================================
   Micro libraries
   * Bean    : Events API          - https://github.com/fat/bean
   * Bonzo   : DOM utility         - https://github.com/ded/bonzo
   * domReady: Obvious             - https://github.com/ded/domready
   ========================================================================== */


// Create a closure to maintain scope of the '$' and remain compatible with other frameworks
;(function(ZANDER) {

	domready(function () {
		ZANDER.SiteSetup.init();
	});// END DOC READY

	ZANDER.SiteSetup = {
		init : function () {
			ZANDER.ui.init();
		}
	};

	ZANDER.ui = {
		logo : document.querySelector('.zm-logo'),
		masthead : document.querySelector('.masthead'),
		mastheadContent : document.querySelector('.masthead-content'),
		heroUnit : document.querySelector('.hero-unit'),

		navDocked : false,
		mastheadContentClosed : true,

		init : function() {
			var self = this;
			// console.log('pageName', pageName);
			ZANDER.ui.mastheadContentToggle();
			// if (pageName == 'home') {
				ZANDER.ui.navStickOnScroll();
			// }
			ZANDER.ui.shotSwitch();
			ZANDER.ui.getShotsHeight();
			window.addEventListener('resize', function(e) {
				ZANDER.ui.getShotsHeight();
			});
		},

		mastheadContentToggle : function() {
			ZANDER.ui.logo.addEventListener('click', function(e) {
				if ( ZANDER.ui.mastheadContentClosed === true ) {
					ZANDER.ui.mastheadContentOpen();
				} else {
					ZANDER.ui.mastheadContentClose();
				}
			});
		},

		mastheadContentOpen : function() {
			_gaq.push(['_trackEvent', 'Navigation', 'Opened']);
			var mastheadContentHeight = ZANDER.ui.mastheadContent.scrollHeight;
			ZANDER.ui.mastheadContent.style.height = mastheadContentHeight + 'px';
			ZANDER.ui.logo.classList.add('is-active');
			ZANDER.ui.mastheadContentClosed = false;
		},

		mastheadContentClose : function() {
			ZANDER.ui.mastheadContent.style.height = '0px';
			ZANDER.ui.logo.classList.remove('is-active');
			ZANDER.ui.mastheadContentClosed = true;
		},

		/**
		 * Stick masthead content to top of screen on scroll
		 */
		navStickOnScroll : function() {
			// console.log('navStickOnScroll');
			var navOffset = ZANDER.ui.masthead.offsetTop;

			document.addEventListener('scroll', function(event) {
				var scrollTop = window.scrollY;
				//console.log(scrollTop, navOffset, navOffset - scrollTop);

				if (!ZANDER.ui.navDocked && (navOffset - scrollTop < 0)) {
					ZANDER.ui.masthead.classList.add('stuck');
					ZANDER.ui.navDocked = true;
					ZANDER.ui.heroUnit.style.marginBottom = ZANDER.ui.masthead.scrollHeight;
				} else if (ZANDER.ui.navDocked && (navOffset - scrollTop >= 0) ) {
					ZANDER.ui.masthead.classList.remove('stuck');
					ZANDER.ui.heroUnit.style.marginBottom = 0;
					ZANDER.ui.navDocked = false;
				}

				if ( !ZANDER.ui.mastheadContentClosed ) {
					ZANDER.ui.mastheadContentClose();
					ZANDER.ui.mastheadContentClosed = true;
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
			// $('#main').on('.layout-desktop-three-up figure', 'click', function(event) {
			// 	var $this = $(this),
			// 		$allSiblings = $this.siblings('.shot-visible').andSelf(),
			// 		allSiblingsCount = $allSiblings.length - 1
			// 	;

			// 		if ( $this.hasClass('shot-1') ) {
			// 			// console.log('do nothing');
			// 			return false;
			// 		} else if ( $this.hasClass('shot-2') ) {

			// 			$allSiblings.each(function(i) {
			// 				var number = parseInt( $(this).data('index') , 10 );
			// 				// console.log('number: ' + number );
			// 				var
			// 					className    = 'shot-' + i,
			// 					incClassName
			// 				;

			// 				if ( number >= allSiblingsCount  ) {
			// 					number = 0;
			// 					incClassName = 'shot-' + number;
			// 				} else {
			// 					number++;
			// 					incClassName = 'shot-' + number;
			// 				}

			// 				$(this).removeClass().addClass(incClassName).addClass('shot-visible').data('index', number);
			// 			});

			// 			// console.log('next');
			// 		} else {

			// 			$allSiblings.each(function(i) {
			// 				var number = parseInt( $(this)[0].className.match(/shot-(\d+)/)[1] , 10);
			// 				// console.log('number: ' + number );
			// 				var
			// 					className    = 'shot-' + i,
			// 					incClassName
			// 				;

			// 				if ( number === 0  ) {
			// 					number = 2;
			// 					incClassName = 'shot-' + number;
			// 				} else {
			// 					number--;
			// 					incClassName = 'shot-' + number;
			// 				}

			// 				$(this).removeClass().addClass(incClassName).addClass('shot-visible');
			// 			});

			// 			console.log('prev');
			// 		}

			// });

			// // .layout-desktop-two-up
			// $('#main').on('.layout-desktop-two-up figure', 'click', function(event) {

			// 	if ( $(this).hasClass('shot-1') ) {
			// 		// Move 1>0
			// 		$(this).addClass('shot-0').removeClass('shot-1')
			// 		// Move 1>0
			// 		.siblings('.shot-0').removeClass('shot-0').addClass('shot-1');

			// 	} else {
			// 		// Move 0>1
			// 		$(this).removeClass('shot-0').addClass('shot-1')
			// 		// Move 1>0
			// 		.siblings('.shot-1').removeClass('shot-1').addClass('shot-0');
			// 	}
			// });
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
				// console.log($parent);
				// console.log($shotHeight);

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

})(window.ZANDER = window.ZANDER || {});
