/*jslint white: true, browser: true, devel: true, debug: true */
/*jshint browser:true, camelcase: true, curly:true, forin:true, indent:4, latedef: true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, maxerr:50, white:false, smarttabs:false, quotmark: single, trailing: true, debug: true, laxcomma: true */

/*	Author:
		TMW - Zander Martineau, Alex Wakeman, Ivan Hayes
*/

// ======================================
// === Declare global 'TMW' namespace ===
// ======================================
var TMW = window.TMW || {};

// Create a closure to maintain scope of the '$' and remain compatible with other frameworks
(function($) {

	$(function() {

		var
			APP_ID_LOCALHOST = '254789127981405',
			APP_ID_CI = '141000049387919',
			APP_ID_QA = '329986897110246',
			APP_ID_STAGING = '213937485397883',
			APP_ID_PRODUCTION = '531814723496036',

			facebookAppID,
			domainString = window.location.href
		;

		if (domainString.indexOf ('localhost') !== -1) {
			facebookAppID = APP_ID_LOCALHOST;
		}
		else if (domainString.indexOf ('lsa-ci.tmwtest') !== -1) {
			facebookAppID = APP_ID_CI;
		}
		else if (domainString.indexOf ('lsa-qa.tmwtest') !== -1) {
			facebookAppID = APP_ID_QA;
		}
		else if (domainString.indexOf ('lynxeffect.com/staging') !== -1) {
			facebookAppID = APP_ID_STAGING;
		}
		else if (domainString.indexOf ('lynxeffect.com/boosters')) {
			facebookAppID = APP_ID_PRODUCTION;
		}

		TMW.Facebook = new FacebookProxy (facebookAppID, ['publish_stream', 'user_photos']);
		TMW.Facebook.facebookInitialisedSignal.add (facebookInitialisedSignalHandler);
		TMW.Facebook.init ();

		function facebookInitialisedSignalHandler() {
			TMW.Facebook.facebookInitialisedSignal.remove(facebookInitialisedSignalHandler);
			// log("script.js:: [facebookInitialisedSignalHandler]");

			// =====================
			// === Init the site ===
			// =====================
			TMW.SiteSetup.init();
		}


	});// END DOC READY

	// WINDOW.RESIZE
	$(window).smartresize(function(){
		// log('Resize event fired');
		TMW.Navigation.changeBodyHeight(TMW.Navigation.currentPage);
	});

})(jQuery);

TMW.SiteSetup = {
	$html                : $('html'),                                     // TMW.SiteSetup.$html
	body                 : document.body,                                 // TMW.SiteSetup.body
	main                 : document.getElementById('main'),               // TMW.SiteSetup.main
	posterBoyContainer   : document.getElementById('poster-boy-page'),    // TMW.SiteSetup.posterBoyContainer
	gimmeStatusContainer : document.getElementById('gimme-status-page'),  // TMW.SiteSetup.gimmeStatusContainer

	// Debuggers
	modernizrFallbackDebugger : false,
	mousePositionDebugger     : false,
	mouseClickDebugger        : false,

	init : function() {

		TMW.ResponsiveControl.newBreakpoint = $(window).width();
		TMW.ResponsiveControl.init();
		TMW.Navigation.init();


		if ( TMW.SiteSetup.mousePositionDebugger === true ) {
			TMW.Debugger.mousePosition();
		}

		if ( TMW.SiteSetup.modernizrFallbackDebugger === true ) {
			TMW.Debugger.modernizrClassToggle('csstransitions');
		}
	}
};

TMW.UserVars = {
	status : 0,
	name : '',
	lsaURL : '',
	currentPoster : '',
	bitlyUrl : '',
	userImageURL : '',
	generatedImageURL : '',
	coords : '',
	lastPage : '',
	gimmeStatusMsg : ''
};

// TMW.ajaxMethod;
if ( $('html').hasClass('lt-ie10') ) {
	TMW.ajaxMethod = 'POST';
} else {
	TMW.ajaxMethod = 'GET';
}

TMW.SessionState = {

	posterDetailsSaveCompleteSignal      : new signals.Signal (),
	posterDetailsSaveErrorSignal         : new signals.Signal (),
	gimmeStatusDetailsSaveCompleteSignal : new signals.Signal (),
	gimmeStatusDetailsSaveErrorSignal    : new signals.Signal (),

	validateLSA                          : true, // TMW.SiteSetup.validateLSA -  Enable/disable LSA validation
	posterverified                       : false,
	urlIsLSAFormat						 : false,
	previousUrlWasLSAFormat				 : false,
	userURLRegEx						 : new RegExp("^https?://", "i"), // used to check if a submitted url starts with 'http://' or 'https://', case insensitive.

	populateUserVars : function() {
		// get user session, hydrate UserVars obj
		log('>>>> RUNNING populateUserVars');

		$.ajax({
			url : 'user/getdetails',
			type : TMW.ajaxMethod,
			dataType : 'JSON',
			success: function(data) {
				if (data.Status === 0) {
					log('not LSA verified');
				}
				else if (data.Status === 1) {
					TMW.UserVars.status = data.Status;
					TMW.UserVars.name = data.Details.Name;
					TMW.UserVars.lsaURL = data.Details.LsaUrl || ''; // set to empty string if null.
					TMW.UserVars.currentPoster = data.Details.CurrentPoster;
					TMW.UserVars.bitlyUrl = data.Details.BitlyUrl;
					TMW.UserVars.userImageURL = data.Details.UserImageUrl;
					TMW.UserVars.generatedImageURL = data.Details.GeneratedImageUrl;
					TMW.UserVars.coords = data.Details.Coords;
					TMW.UserVars.lastPage = data.Details.Page;
					TMW.UserVars.gimmeStatusMsg = data.Details.GimmeStatusMsg;

					if (TMW.Navigation.currentPage === 'poster-boy') {
						// log('populate poster boy page before check');

						if ( (TMW.PosterBoyPage) ) {
							TMW.PosterBoyPage.populatePage();
							log('populate poster boy page');
						}
					} else if (TMW.Navigation.currentPage === 'gimme-status') {
						// log('populate poster gimme status before check');

						if ( TMW.GimmeStatusPage ) {
							TMW.GimmeStatusPage.populatePage();
							log('populate gimme status page');
						}
					}


				}
				log('populate uservars:', data);
				// log('TMW.UserVars.status :' + TMW.UserVars.status );
			},
			error : function(e) {
				log('USER DETAILS ERROR: \n' + e.responseText);
			}
		});
	},

	SaveLSADetails : function(lsaURLInputTextBox, overlay, helpPanel, helpPanelText, name, nameBox) {
		name = typeof name !== 'undefined' ? name : (TMW.UserVars.name || '');
		
		var userURL = lsaURLInputTextBox.val();
		// check if url contains 'http://' or 'https://' and if not then add 'http://'.
		if (userURL !== "" && !TMW.SessionState.userURLRegEx.test (userURL)) {
			userURL = "http://" + userURL;
		}

		var lsaChkObj;
		var fullURL = 'user/checklsaurl?lsaurl=' + userURL;
		var data = {};
		data.text = name;
		$.ajax({
			url : 'user/profanityfilter',
			type : 'POST',
			data : data,
			dataType : 'JSON',
			success : function(json) {
				switch (json.Status) {
				case 0: // bad
					if (TMW.PosterBoyPage) {
						TMW.PosterBoyPage.showPopup('Shame on you – that’s a dirty word. Try again…');
					}
					break;
				case 1: // good - name contains no profanities
					$.ajax({
						url : fullURL,
						type : 'GET',
						dataType : 'JSON',
						success: function(lsaChkObj) {
							log('lsaChkObj.Status: ' + lsaChkObj.Status);
							log('lsaURLInputTextBox: ' + this );

							TMW.SessionState.previousUrlWasLSAFormat = TMW.SessionState.urlIsLSAFormat;
							TMW.SessionState.urlIsLSAFormat = lsaChkObj.Status === 1 ? true : false;

							if ( lsaChkObj.Status === 1 || TMW.SessionState.validateLSA === false ) {

								TMW.SessionState.isLSAVerified = true;
								lsaURLInputTextBox.addClass('is-valid');//.attr('readonly', 'true');

								if (nameBox) {
									nameBox.addClass('is-valid');
								}
								var data = {};
								data.LsaUrl = lsaURLInputTextBox.val();
								data.BitlyUrl = lsaChkObj.BitlyUrl;
								data.Name = name;
								$.ajax({
									url : 'user/savedetails',
									type : 'POST',
									data : data,
									dataType : 'JSON',
									success : function(json) {
										if (TMW.PosterBoyPage) {
											TMW.PosterBoyPage.detailsChangedAndNotSubmitted = false;
										}

										if (TMW.GimmeStatusPage) {
											TMW.GimmeStatusPage.detailsChangedAndNotSubmitted = false;
										}

										TMW.SessionState.populateUserVars();
										log('Save details success: ', json);
										return true;
									},
									error : function(e) {
										log('Save details error: ', e.responseText);
										return false;
									}
								});


								/* 'TMW.SessionState.validateLSA' is set to false automatically when the submit
									button related to 'name-check form' is submitted within the 'poster boy'
									section, but since validation is required for the 'gimme status' section
									we need to ensure its value is once again set to true.
								*/
								TMW.SessionState.validateLSA = true;

								return false;
							}
							else { // showing LSA verification fail panel
								overlay.fadeIn('slow');
								helpPanelText.text('Sorry, that doesn’t seem to be a valid L.S.A URL – just copy the URL from your page on lynxapollo.com');
								helpPanel.slideToggle('slow', function() {
									helpPanel.css('color', '#fff');
								});

								if (TMW.Navigation.currentPage === 'gimme-status') {
									TMW.GimmeStatusPage.resetLSAToPreviouslyStoredValueIfExists ();
								}

								return false;
							}
						},
						error : function(e) {
							lsaChkObj = {};
							lsaChkObj.Status = 0;
							log('SaveLSADetails error');
						}
					});
					break;
				}
			},
			error : function(e) {
				// log('Profanity error: ' + e.responseText);
			}
		});
	},



	SavePosterDetails : function (currentPoster, userImageData, generatedImageURL, userImageURL) {
		// log("script:: [SavePosterDetails] \n -> userImageURL: " + userImageURL + "\n -> generatedImageURL: " + generatedImageURL);

		if (TMW.UserVars.status == 1) { // only save poster if LSA verified
			var data = {};
			if (userImageData)
			{
				data.Coords = userImageData.x + "," + userImageData.y + "," + userImageData.w + "," + userImageData.h;
				data.UserImageUrl = userImageURL;
				data.GeneratedImageUrl = generatedImageURL;
			}
			else
			{
				data.Coords = "";
				data.UserImageUrl = "";
				data.GeneratedImageUrl = "";
			}

			data.CurrentPoster = currentPoster;
			data.Name = TMW.UserVars.name;
			data.Page = TMW.Navigation.currentPage;
			data.BitlyUrl = TMW.UserVars.bitlyUrl;
			data.CurrentStatus =  TMW.UserVars.status;
			data.LsaUrl = TMW.UserVars.lsaURL;
			data.GimmeStatusMsg = TMW.UserVars.gimmeStatusMsg;

			$.ajax({
				url : 'user/savedetails',
				type : 'POST',
				data : data,
				dataType : 'JSON',
				success : function(response) {
					// log('Save details:', response);
					// return true;
					TMW.SessionState.posterDetailsSaveCompleteSignal.dispatch (response);
				},
				error : function(error) {
					// log('Save details:', error.responseText);
					// return false;

					TMW.SessionState.posterDetailsSaveErrorSignal.dispatch (error.responseText);
				}
			});
		}
	},

	SaveStatusDetails : function (userImageData, generatedImageURL) {
		if (TMW.UserVars.status == 1) { // only save poster if LSA verified
			var data = {};

			data.Page = TMW.Navigation.currentPage;
			data.BitlyUrl = TMW.UserVars.bitlyUrl;
			data.CurrentStatus =  TMW.UserVars.status;
			data.LsaUrl = TMW.UserVars.lsaURL;
			data.GimmeStatusMsg = TMW.UserVars.gimmeStatusMsg;

			$.ajax({
				type : 'POST',
				url : 'user/savedetails',
				data : data,
				dataType : 'JSON',
				success : function(response) {
					// log('Save details:', response);
					// return true;
					TMW.SessionState.gimmeStatusDetailsSaveCompleteSignal.dispatch (response);
				},
				error : function(error) {
					// log('Save details:', error.responseText);
					// return false;

					TMW.SessionState.gimmeStatusDetailsSaveErrorSignal.dispatch (error.responseText);
				}
			});
		}
	},
	isLSAVerified : false
};


TMW.Navigation = {
	pageTopOffset : 100,
	homePosTop : 0,
	posterPosTop : 3500,
	gimmePosTop : 2000,

	// Page states
	homeLoaded : false,
	poster_boyLoaded : false,
	gimme_statusLoaded : false,

	desktopCarousel : null,
	mobileCarousel  : null,

	currentPage : 'home',

	init : function() {

		// Modernizr loads the routes from Layout.cshtml if the browser does not support css transitions
		if ( Modernizr.csstransitions ) {
			TMW.Navigation.routingSetup();
		}

	},

	routingSetup : function() {
		var router = Router(TMW.Navigation.PageRoutes);
		router.configure({
			notfound: notFound,
			html5history: false
		});

		router.init('/home');

		function notFound() {
			// log('no route found');
			router.setRoute('/home');
		}
	},

	loadPage : function(newLocation) {
		var
		$targetDiv = $('#' + newLocation + '-page'),
		pageName = newLocation.replace('-', '_') // home, poster_boy or gimme_status
		;

		if ( TMW.Navigation[pageName + 'Loaded'] === false ) {
			$targetDiv.load('content/' + pageName + '/', function() {
				$('html,body')
				.animate({
					scrollTop: 0
				}, 100, function() {
					TMW.Navigation.changeBodyHeight(newLocation);
				});
			});

			TMW.Navigation[pageName + 'Loaded'] = true;
		}
	},

	movePage : function(page) {
		//TMW.Navigation.loadPage(page);
		TMW.Navigation.pageTransition(page);
		TMW.SessionState.populateUserVars();
	},

	pageTransition : function(newLocation) {
		var pageTitle = 'Home';

		// Change the page title depending on the current page
		if ( newLocation === 'poster-boy' ) {
			pageTitle = 'Poster Boy';
			TMW.Navigation.activeNav(newLocation);
		} else if ( newLocation === 'gimme-status' ) {
			pageTitle = 'Gimme Status';
			TMW.Navigation.activeNav(newLocation);
		} else {
			pageTitle = 'Home';
			// If an incorrect url is entered, user is directed back to the homepage
			newLocation = 'home';
			TMW.Navigation.activeNav('home');
		}

		// log(newLocation);
		TMW.Navigation.loadPage(newLocation);
		TMW.Navigation.currentPage = newLocation;

		// Change page title
		document.title = pageTitle + ' | Lynx Apollo';

		if ( !Modernizr.csstransitions || TMW.SiteSetup.modernizrFallbackDebugger === true) {
			TMW.Navigation.moveBetweenPagesFallback(newLocation);
		}

		// Adding a class to the
		$(TMW.SiteSetup.body).removeClass().addClass('state-' + newLocation);

		TMW.Navigation.changeBodyHeight(newLocation);

		if (typeof (TMW.Facebook) !== 'undefined')
		{
			var currentLocation = window.location.href;
			var strippedLocation = "";
			var redirectURI;

			/*
			if (window.location.search.indexOf ('fb_sig_in_iframe=1') != -1
			|| window.location.search.indexOf('session=') != -1
			|| window.location.search.indexOf('signed_request=') != -1
			|| window.name.indexOf('iframe_canvas') != -1
			|| window.name.indexOf('app_runner') != -1)
			{
				// We are within the FB Canvas.
				redirectURI = currentLocation + "?path=" + newLocation;

				alert ("inside FB Canvas");
			}
			else
			{
				// We are outside the FB Canvas
				redirectURI = currentLocation;

				alert ("outside FB Canvas");
			}
			*/

			// FIXME: Empty if, suggest changing to if (!TMW.IsInFacebook)
			if (TMW.IsInFacebook)
			{
				redirectURI = "https://apps.facebook.com/lsa-vote-boosters/?path=" + TMW.Navigation.currentPage;
			} else {
				redirectURI = currentLocation;
			}


			TMW.Facebook.redirectURI = redirectURI;
			// log ("\n\n\n -------- TMW.Facebook.redirectURI: " + TMW.Facebook.redirectURI + "\n\n");
		}
	},

	moveBetweenPagesFallback : function(location) {
		log('We don\'t have transitions');
		// log('location: ' + location);
		CSSPlugin.defaultTransformPerspective = 500;

		var
		main = TMW.SiteSetup.main,
		sun = document.getElementById('sun'),
		moon = document.getElementById('moon'),
		earth = document.getElementById('earth')
		;

		switch (location) {
			case 'home':
				// log('home');
				TweenLite.to(main, 1.5, {
					css:

					{
						top: -TMW.Navigation.homePosTop,
						marginLeft: '-3000px'
					}
				});
				TweenLite.to(sun, 1.5, {
					css:

					{
						top: TMW.Navigation.homePosTop - 500,
						marginLeft: '-900px'
					}
				});
				TweenLite.to(moon, 1.5, {
					css:

					{
						top: TMW.Navigation.homePosTop + 770,
						marginLeft: '650px'
					}
				});
				TweenLite.to(earth, 1.5, {
					css:

					{
						top: TMW.Navigation.homePosTop - 440,
						marginLeft: '-1960px'
					}
				});
				break;

			case 'poster-boy':
				// log('poster');
				TweenLite.to(main, 1.5, {
					css:

					{
						top: -TMW.Navigation.posterPosTop,
						marginLeft: '-1500px'
					}
				});
				TweenLite.to(sun, 1.5, {
					css:

					{
						top: TMW.Navigation.posterPosTop - 500,
						marginLeft: '-2400px'
					}
				});
				TweenLite.to(moon, 1.5, {
					css:

					{
						top: TMW.Navigation.posterPosTop + 520,
						marginLeft: '-740px'
					}
				});
				TweenLite.to(earth, 1.5, {
					css:

					{
						top: TMW.Navigation.posterPosTop - 1100,
						marginLeft: '-3160px'
					}
				});
				break;

			case 'gimme-status':
				// log('gimme');
				TweenLite.to(main, 1.5, {
					css:

					{
						top: -TMW.Navigation.gimmePosTop,
						marginLeft: '-5000px'
					}
				});
				TweenLite.to(sun, 1.5, {
					css:

					{
						top: TMW.Navigation.gimmePosTop - 500,
						marginLeft: '1100px'
					}
				});
				TweenLite.to(moon, 1.5, {
					css:

					{
						top: TMW.Navigation.gimmePosTop + 400,
						marginLeft: '2060px'
					}
				});
				TweenLite.to(earth, 1.5, {
					css:

					{
						top: TMW.Navigation.gimmePosTop - 890,
						marginLeft: '-200px'
					}
				});
				break;
		}
	},

	activeNav : function(pageName) {
		$('#' + pageName + '-button').addClass('is-active').siblings().removeClass('is-active');
	},

	changeBodyHeight : function(newLocation) {
		// Check for current element
		// Animate body height based on that outcome
		var
			$el = $('#' + newLocation + '-page'),
			$elHeight = $el.height() + 200
		;
		$(TMW.SiteSetup.body).animate({
			height: $elHeight + 'px'
		}, 200).css('overflow', 'hidden');

		// log('Body height changed to: ' + $elHeight);
	},

	homePage : function() {
		// log('Home page');
		TMW.Navigation.movePage('home');

	},

	posterBoyPage : function() {
		// log('Poster boy page');
		TMW.Navigation.movePage('poster-boy');

		yepnope([{
			load: ['Js/scalable-image.js','Js/poster-builder.js', 'Js/libs/plugins/jquery.form.js', 'Js/libs/plugins/jquery.roundabout.min.js', 'Js/poster-boy-interface.js'],
			complete: function() {

			}
		}]);
	},

	gimmeStatusPage : function() {
		// log('Gimme Status page');
		TMW.Navigation.movePage('gimme-status');

		yepnope([{
			load: 'Js/gimme-status-interface.js'
		}]);
	}
};

TMW.Navigation.PageRoutes =  {
	'/home': TMW.Navigation.homePage,
	'home': TMW.Navigation.homePage,
	'/poster-boy': TMW.Navigation.posterBoyPage,
	'poster-boy': TMW.Navigation.posterBoyPage,
	'/gimme-status': TMW.Navigation.gimmeStatusPage,
	'gimme-status': TMW.Navigation.gimmeStatusPage
};

TMW.Status = {

	_originalElementDictionary: [],

	showLoaderForElement : function($el) {

		// check if obj is already in dictionary, if it is then return.
		var i = 0;
		var length = this._originalElementDictionary.length;
		var currentElObject;
		for (i; i <  length; ++i)
		{
				currentElObject = this._originalElementDictionary[i];

				// log ("[showLoaderForElement] --------------------> loop \n --> currentElObject.originalText: " + currentElObject.originalText);

				if ($el === currentElObject.el && $el.text () === currentElObject.originalText) return;
		}

		this._originalElementDictionary.push ({el:$el, originalText:$el.text ()});

		$el.text('loading...');
	},
	hideLoaderForElement : function($el) {

		// find obj in dictionary to reset its text , then remove it from the dictionary.
		var i = 0;
		var length = this._originalElementDictionary.length;
		var currentElObject;
		for (i; i <  length; ++i)
		{
				currentElObject = this._originalElementDictionary[i];

				// log ("[hideLoaderForElement] --------------------> loop \n --> currentElObject.originalText: " + currentElObject.originalText);

				if ($el === currentElObject.el)
				{
						$el.text (currentElObject.originalText);
						this._originalElementDictionary.splice (i, 1);
						return;
				}
		}
	},
	hideLoaderForAllStoredElements : function() {

		// find objects in dictionary, reset their text, then empty the dictionary.
		var i = 0;
		var length = this._originalElementDictionary.length;
		var currentElObject;
		for (i; i <  length; ++i)
		{
				currentElObject = this._originalElementDictionary[i];
				currentElObject.el.text (currentElObject.originalText);
		}

		_originalElementDictionary = [];
	}
};

TMW.PluginLoaded = {
	roundabout: false
};


/*	ResponsiveControl method
:	-------------------------
:	this function fires controlled events to help control which JS methods should be
:	bound at different screen widths
:
:	for example, the primary navigation has different bound events for mobile than wider screen
:	resolutions - this switcher detects the width and sends callbacks to bind/unbind those events
:
:
:	Variables
:	1. $currentWindow		- reference to the current window
:	2. $breakpointTest		- reference to a div that has a predefined z-index applied to it from the CSS through MQs
:	3. currentWindowSize	- the current window size of the page
:	4. currentBreakPoint	- our current breakpoint - initially set to 0
:	5. newBreakPoint		- our new breakpoint - initially set to 1 to fire our checker on page load
:	6. isScroller			- Boolean set if iScroll is defined on the page
:	7. isTablet				- Boolean set if PHP has detected this is a tablet
:	8. isMQ					- Boolean set dependent on whether the device supports mediaqueries (depreciated)
:
:
:	Function List
:	1. init
:	2. getNewBreakPoint
:	3. checker				- fired by getNewBreakPoint to fire other conditions that are met
********************************************************/
TMW.ResponsiveControl = {

	$currentWindow			: $(window),
	$breakpointTest			: null,
	currentWindowSize		: 0,
	currentBreakPoint		: 0,
	newBreakPoint			: 1,

	isScroller				: false,
	isMobile				: false,
	isTablet				: false,
	isMQ					: false,
	isOldIE					: false,
	hasTransitions			: false,

	smallMQ					: 470,
	midMQ					: 641,
	lrgMQ					: 850,

	windowWidth				: $(window).width(),

	init : function() {
		var breakpointTest = document.createElement('div');
		breakpointTest.setAttribute('id', 'breakpoint-test');
		TMW.SiteSetup.body.appendChild(breakpointTest);

		TMW.ResponsiveControl.$breakpointTest = $('#breakpoint-test');

		//checks if backend has detected if we're on mobile or tablet and other progressive queries
		TMW.ResponsiveControl.getNewBreakPoint();
		this.checkState();
	},

	checkState : function () {

		//bind the window resize event to the checker function
		//MAY NEED TO THROTTLE/DEBOUNCE THIS - TEST!
		$(window).smartresize(function(){
			TMW.ResponsiveControl.currentWindowSize = TMW.ResponsiveControl.$breakpointTest.width();
			// log('Current window width: ' + TMW.ResponsiveControl.currentWindowSize);
			TMW.ResponsiveControl.getNewBreakPoint();
			// run checker
		});
		this.$currentWindow.trigger('resize'); //trigger initial resize
		this.checker();

	},

	// checkBreakpoints : function() {

	// },

	/*	Uses the z-index in the CSS to fire our
	:	JS breakpoints
	********************************************************/
	getNewBreakPoint : function () {

		// inspect the CSS to see what breakpoint the new window width has fallen into
		TMW.ResponsiveControl.newBreakpoint = parseInt(TMW.ResponsiveControl.$breakpointTest.css('zIndex'), 10);

		TMW.ResponsiveControl.checker();
	},

	/*	the heart of the control - this is what is fired by the screen resize
	:	and so when we hit certain breakpoints, will fire the calls for event binding to our other methods
	:	this also needs to fire on page load to set the correct bindings then
	********************************************************/
	checker : function () {
		if ( TMW.ResponsiveControl.newBreakpoint >= TMW.ResponsiveControl.midMQ ) {
			// log('Wider than ' + TMW.ResponsiveControl.midMQ);
			TMW.ResponsiveControl.isMobile = false;
		} else {
			// log('Thinner than ' + TMW.ResponsiveControl.midMQ);
			TMW.ResponsiveControl.isMobile = true;
		}

		//make the breakpoint the same so doesn't keep firing the checker each time
		TMW.ResponsiveControl.currentBreakPoint = TMW.ResponsiveControl.newBreakpoint;
	}
};


TMW.Debugger = {
	mousePosition : function() {
		$('<div id="coords"/>').appendTo('body');

		TMW.SiteSetup.main.mousemove(function(e) {
			var parentOffset = $(this).position();
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;


			$('#coords').html('Top/Y: ' + relY + 'px<br>Left/X: ' + relX + 'px');
			// log('X: ' + relX + 'px<br> Y: ' + relY + 'px');
		});

		if ( TMW.SiteSetup.mouseClickDebugger === true ) {
			TMW.Debugger.mouseClickPosition();
		}
	},

	mouseClickPosition : function() {
		$(TMW.SiteSetup.body).click(function(e) {
			var parentOffset = $(this).offset();
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;

			$('<div class="blob"/>').appendTo($(this)).css({
				top: relY,
				left: relX
			}).html('Top/Y: ' + relY + 'px<br>Left/X: ' + relX + 'px');

		// TMW.SiteSetup.getRotation("#main");
		});
	},

	modernizrClassToggle : function(className) {
		$('html').removeClass(className).addClass('no-' + className);
	}
};


