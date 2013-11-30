/*jslint white: true, browser: true, devel: true, debug: true */
/*jshint browser:true, camelcase: true, curly:true, forin:true, indent:4, latedef: true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, maxerr:50, white:false, smarttabs:false, quotmark: single, trailing: true, debug: true, laxcomma: true */
var _self = this;
var overlay;
var lightbox;
var namePreview;
var posterUserName;
var userName = '';
var helpPanelPB;
var helpPanelTextPB;

var posterBuilder = new TMW.PosterBuilder ();
var mobilePosterList = [];
var currMobPoster = 0;

var TMW = window.TMW || {};
TMW.PosterBoyPage = {
	$desktopCarouselContainer		: $('.carousel-container'), // TMW.PosterBoyPage.$desktopCarouselContainer
	$desktopCarousel 				: $('.carousel'),           // TMW.PosterBoyPage.$desktopCarousel
	$lsaURL							: $('#lsa-url-pb'),         // TMW.PosterBoyPage.$lsaURL
	$nameTextField			  		: $("#name"),
	detailsChangedAndNotSubmitted   : false,
	
	populatePage : function() {

		// log('Poster boy populate page!');
		if (TMW.UserVars.status === 1 && TMW.UserVars.currentPoster && TMW.UserVars.currentPoster !== "") {
			// trigger lightbox with user's previously selected image,
			// with name and LSA populated already from session vars
			var imgFile = TMW.UserVars.currentPoster;
			var hasFace = ($('[data-poster-id=' + imgFile + ']').hasClass('has-face')) ? true : false;
			_self.userName = (TMW.UserVars.name !== null) ? TMW.UserVars.name.substring(0, 15) : '';
			$('#name').val(_self.userName);
			if (_self.userName.length > 0) {
				$('#name').addClass('is-valid');
				TMW.PosterBoyPage.$lsaURL.addClass('is-valid');//.attr('readonly', 'true');
				$('#name-check').addClass('is-valid');
			}

			TMW.PosterBoyPage.$lsaURL.val(TMW.UserVars.lsaURL);
			_self.overlay.fadeIn('slow');

			_self.showPosterBuilder(imgFile, hasFace);

		}
		else if (TMW.UserVars.status === 1) {
			// set user's name from previously verified session'
			_self.userName = (TMW.UserVars.name !== null) ? TMW.UserVars.name.substring(0, 15) : '';
			$('#name').val(_self.userName);
			if (_self.userName.length > 0) {
				$('#name').addClass('is-valid');
				TMW.PosterBoyPage.$lsaURL.addClass('is-valid');//.attr('readonly', 'true');
				$('#name-check').addClass('is-valid');
			}
			// console.log($('.roundabout-in-focus').attr('data-poster-id'));
			_self.updateNamePreview('basic');
			TMW.PosterBoyPage.$lsaURL.val(TMW.UserVars.lsaURL);
			TMW.PosterBoyPage.updateNamePreview();
		}
	},

	showPopup : function (msg) {
		var $scrollTopVal = $(document).scrollTop();
		_self.overlay.fadeToggle('slow');
		_self.helpPanelTextPB.text(msg);
		_self.helpPanelPB.css({
			top: $scrollTopVal + 20
		}).slideToggle('slow', function() {
			_self.helpPanelPB.css('color', '#fff');
		});
	},

	showPBPopup : function (msg) {
		_self.helpPanelTextPB.text(msg);
		self.helpPanelPB.css ({top: $(document).scrollTop () + posterBuilder.SCROLL_TOP_PADDING});
		_self.helpPanelPB.slideToggle('slow', function() {
			_self.helpPanelPB.css('color', '#fff');
			// log("----------------> setting color: " + _self.helpPanelPB.css('color'));
		});
	},

	hidePBPopup : function () {
		_self.helpPanelTextPB.text('');
		_self.helpPanelPB.slideToggle('slow', function(){
			_self.helpPanelPB.css('color', 'transparent');
		});
	},

	responsive : function() {
		if ( TMW.ResponsiveControl.isMobile === false ) {

			if ( TMW.PluginLoaded.roundabout === false ) {
				TMW.PosterBoyPage.$desktopCarousel.roundabout({
					minScale : 0.7,
					btnNext : '#carousel-right',
					btnPrev : '#carousel-left',
					minOpacity: 0.1,
					responsive: false
				}, function() {
					TMW.PosterBoyPage.$desktopCarouselContainer.fadeTo('1400', 1);
					TMW.PluginLoaded.roundabout = true;
				})
				.bind('animationEnd', function() {
					TMW.PosterBoyPage.updateNamePreview();
				});
			}
		}

		TMW.PosterBoyPage.updateNamePreview();
	},

	profanityCheck : function(input) {
		var data = {};
		var jsonData;
		data.text = input;
		$.ajax({
			url : 'user/profanityfilter',
			type : 'POST',
			data : data,
			dataType : 'JSON',
			success : function(json) {
				jsonData = json;
				switch (json.Status) {
					case 0: // bad
						if (TMW.PosterBoyPage) {
							TMW.PosterBoyPage.showPopup('Shame on you – that’s a dirty word. Try again…');
						}
						break;
					case 1: // good - name contains no profanities
						// log('good name!');
						break;
				}

			},
			error : function(e) {
				// log(e.responseText);
			}
		});
		return jsonData;

	},

	updateNamePreview : function() {
		_self.userName = $('#name');

		var activeImageName;
		if ( TMW.ResponsiveControl.isMobile === true ) {
			activeImageName = $('.mc-active').data('poster-id');
			_self.updateNamePreview(activeImageName);
		}
		else {
			activeImageName = $('.roundabout-in-focus').data('poster-id');
			_self.updateNamePreview(activeImageName);
		}
	},

	roundabout : function() {
		TMW.PosterBoyPage.$desktopCarousel.roundabout({
			minScale : 0.7,
			btnNext : '#carousel-right',
			btnPrev : '#carousel-left',
			minOpacity: 0.1,
			// responsive: false,
			debug : true
		}, function() {
			// log('roundabout has loaded');
			TMW.PosterBoyPage.$desktopCarouselContainer.fadeTo('1400', 1);
			TMW.PluginLoaded.roundabout = true;
		})
		.bind('animationEnd', function() {
			TMW.PosterBoyPage.updateNamePreview();
		});
	},

	showLightbox : function() {
		// log('Showing lightbox');
		if (_self.userName.length === 0) {
			TMW.PosterBoyPage.showPopup('Please ensure you have entered a name to open your poster.');
			return false;
		}
		else if (TMW.PosterBoyPage.detailsChangedAndNotSubmitted) {
			TMW.PosterBoyPage.showPopup('You must submit your details before opening your poster.');
			return false;
		}
		else if (TMW.UserVars.status == 0) {
			// TMW.PosterBoyPage.showPopup('You must verify your L.S.A. URL before opening your poster.');
			TMW.PosterBoyPage.showPopup('You must submit your details before opening your poster.');
			return false;
		}
		else if (TMW.UserVars.status == 1) {
			// trigger lightbox with currently selected image
			var selected;

			if ( TMW.ResponsiveControl.newBreakpoint < TMW.ResponsiveControl.midMQ ) {
				selected = $(TMW.SiteSetup.body).find('.mc-active');
			} else {
				selected = $(TMW.SiteSetup.body).find('.roundabout-in-focus');
			}
			var imgFile = selected.data('poster-id');
			TMW.UserVars.currentPoster = imgFile;
			var hasFace = (selected.hasClass('has-face')) ? true : false;
			_self.showPosterBuilder(imgFile, hasFace);

			TMW.Navigation.changeBodyHeight ('poster-boy');
		}
	},

	loadLocalStorage : function() {
		// log(localStorage['name']);
		$('#name').val(localStorage['name']);
	},

	closePosterBuilder : function(e) {
		e.preventDefault();
		_self.lightbox.fadeOut('slow');
		_self.overlay.fadeOut('slow', function() {
			_self.overlay.removeClass('poster-builder');
			$(TMW.SiteSetup.body).removeClass('poster-builder-interface');
		});
		_self.helpPanelPB.css('color', 'transparent');
		_self.helpPanelPB.slideUp('slow');
		posterBuilder.hide ();
	},

	checkIfUserDetailsHaveChanged : function () {
		if (TMW.UserVars.status == 1 && !TMW.PosterBoyPage.detailsChangedAndNotSubmitted)
		{
			if (typeof (TMW.UserVars.name) !== 'undefined' && TMW.UserVars.name !== null)
			{
				if (TMW.UserVars.name.length > 0 && TMW.PosterBoyPage.$nameTextField.val () === TMW.UserVars.name && TMW.PosterBoyPage.$lsaURL.val () === TMW.UserVars.lsaURL)
				{
					log ("poster boy checkIfUserDetailsHaveChanged... current name and url details were already verified.");

					// the userName and URL are the same as they were previously, so reapply the
					// 'is-valid' class to the relevant elements.
					$('#name-check').addClass('is-valid');
					$('#name').addClass('is-valid');
					TMW.PosterBoyPage.$lsaURL.addClass('is-valid');

					TMW.PosterBoyPage.detailsChangedAndNotSubmitted = false;

					return false;
				}
				else
				{
					// the userName, URL, or both have been changed, and
					// now need to be submitted before a poseter can be selected.
					TMW.PosterBoyPage.detailsChangedAndNotSubmitted = true;

					return true;
				}
			}
			else
			{
				var nameText = TMW.PosterBoyPage.$nameTextField.val ();
				if (nameText.length > 0)
				{
					log ("poster boy checkIfUserDetailsHaveChanged:: the name has changed... returning true");
					TMW.PosterBoyPage.detailsChangedAndNotSubmitted = true;
					return true;
				}
				else
				{
					TMW.PosterBoyPage.detailsChangedAndNotSubmitted = false;
					return false;
				}
			}
		}

		// return true by default to account for before any user details have been submitted.
		return true;
	}
};

$(function() {
	var lsaURL = $('#lsa-url-pb');
	_self.overlay = document.createElement('div');
	_self.overlay.className = 'overlay';
	_self.overlay = $(_self.overlay);
	$(TMW.SiteSetup.body).append(_self.overlay);
	_self.lightbox = $('.lb');
	_self.posterUserName = $('#name-placeholder');
	_self.helpPanelPB = $('#help-panel-pb');
	_self.helpPanelPB.hide();
	_self.helpPanelTextPB = $('#help-text-pb');
	TMW.Navigation.$desktopCarousel = $('.carousel');
	TMW.Navigation.mobileCarousel = $('.mobile-carousel');

	TMW.SessionState.populateUserVars();

	TMW.Navigation.mobileCarousel.children().each(function(index, elem) {
		var poster = $(elem);
			if ( index > 0 ) {
				poster.hide();
			}
		_self.mobilePosterList.push(poster);
	});

	TMW.PosterBoyPage.responsive();

	$(window).smartresize(function(){
		TMW.PosterBoyPage.responsive();
	});

	// if ( TMW.ResponsiveControl.newBreakpoint < TMW.ResponsiveControl.midMQ ) {
	if ( TMW.ResponsiveControl.isMobile === true ) {
		// show mobile carousel
		TMW.Navigation.mobileCarousel.children().each(function(index, elem) {
			var poster = $(elem);
			if ( index > 0 ) {
				poster.hide();
			}
		});
		_self.mobilePosterList[0].show().addClass('mc-active');
	}

	//------------------------------------------------------------------------//
	// initialise poster builder, which grabs the buttons etc. by ID.
	posterBuilder.init ();
	//------------------------------------------------------------------------//

	$('#carousel-right').on('click', function() {
		// if ( TMW.ResponsiveControl.newBreakpoint < TMW.ResponsiveControl.midMQ ) {
			_self.mobilePosterList[_self.currMobPoster].removeClass('mc-active').hide();
			_self.currMobPoster++;
			_self.currMobPoster %= (_self.mobilePosterList.length);
			_self.mobilePosterList[_self.currMobPoster].addClass('mc-active').show();
			_self.updateNamePreview($('.mc-active').data('poster-id'));
		// }
		}
	);

	$('#carousel-left').on('click', function() {
		// if ( TMW.ResponsiveControl.newBreakpoint < TMW.ResponsiveControl.midMQ ) {
			_self.mobilePosterList[_self.currMobPoster].removeClass('mc-active').hide();
			_self.currMobPoster = (_self.currMobPoster === 0) ? 4 : _self.currMobPoster - 1;
			_self.mobilePosterList[_self.currMobPoster].addClass('mc-active').show();
			_self.updateNamePreview($('.mc-active').data('poster-id'));
		// }
		}
	);

	$(TMW.SiteSetup.body).on('click', '#select-button', function() {
		TMW.PosterBoyPage.showLightbox();
	});

	$('#close-lb').on('click', function(e) {
		TMW.PosterBoyPage.closePosterBuilder(e);
	});

	$(_self.overlay).on('click', function(e) {
		TMW.PosterBoyPage.closePosterBuilder(e);
	});

	$(TMW.SiteSetup.body).on('keyup', '#name', function() {
		TMW.PosterBoyPage.updateNamePreview();
	});

	$('#lsa-url-help').on('click', function(e) {
		e.preventDefault();
		TMW.PosterBoyPage.showPopup('Either enter your L.S.A URL from the web address of your page on lynxapollo.com – for example: lynxapollo.com/en-GB/1234/your-name, or alternatively you can enter the URL of a website that you are using to promote your profile');
	});

	$('#help-panel-pb').on('click', function() {
		_self.overlay.fadeOut('slow');
		_self.helpPanelPB.css('color', 'transparent');
		_self.helpPanelPB.slideUp('slow');
	});

	/*
	$(document).keyup(function(e) {
		if (e.keyCode === 27 && _self.uploadPanelPopup.css('display') === 'block') { // user presses esc.
			_self.lightbox.fadeOut('slow');
			_self.overlay.fadeOut('slow');
			_self.helpPanelPB.slideUp('slow');
			posterBuilder.hide ();

		}
	});
	*/

	$("#name, #lsa-url-pb").on('focus', function(e) {
		if (TMW.UserVars.status == 1)
		{
			$('#name-check').removeClass('is-valid');
			$('#name').removeClass('is-valid');
			TMW.PosterBoyPage.$lsaURL.removeClass('is-valid');
		}
	});

	$('#name').on('blur', function(e) {

		// only do the profanity check if the user details have changed/haven't yet been submitted.
		if (TMW.PosterBoyPage.checkIfUserDetailsHaveChanged ())
		{
			log('Profanity check');
			var nameBox = $('#name');
			var $nameInput = $('#name').val();
			TMW.PosterBoyPage.profanityCheck($nameInput);
		}
	});

	$("#lsa-url-pb").on('blur', function(e) {
		TMW.PosterBoyPage.checkIfUserDetailsHaveChanged ();		
	});

	$('#name-check form').on('submit', function(e) {

		log ("TMW.PosterBoyPage.$lsaURL.val (): " + TMW.PosterBoyPage.$lsaURL.val ());
		log ("TMW.UserVars.lsaURL: " + TMW.UserVars.lsaURL);

		var nameBox = $('#name');
		if (_self.userName.length === 0) {
			TMW.PosterBoyPage.showPopup('You need to enter your name – or no-one will know who to vote for…');
		}
		else if (TMW.UserVars.status === 1 && !TMW.PosterBoyPage.checkIfUserDetailsHaveChanged ()) { // only run LSA URL check if they've entered a name as well
			// TMW.PosterBoyPage.showPopup('The details you have provided were already verified.');
		}
		else {
			log('Try to save LSA details');
			TMW.SessionState.validateLSA = false;
			TMW.SessionState.SaveLSADetails(TMW.PosterBoyPage.$lsaURL, _self.overlay, _self.helpPanelPB, _self.helpPanelTextPB, _self.userName, nameBox);
		}

		return false;
	});
});



function showPosterBuilder(posterName, hasFace) {
	var data = {};
	data.text = _self.userName;
	$.ajax({
		url : 'user/profanityfilter',
		type : TMW.ajaxMethod,
		data : data,
		dataType : 'JSON',
		success : function(json) {
			switch (json.Status) {
				case 0: // bad
					TMW.PosterBoyPage.showPopup('Shame on you – that’s a dirty word. Try again…');
					break;
				case 1: // good
					if (TMW.ResponsiveControl.isMobile === false ) {
						// Only show overlay on desktop
						_self.overlay.fadeIn('slow');
					} else {
						_self.overlay.show(0, function() {
							$(this).removeAttr('style');
						}).addClass('poster-builder');
					}

					$(TMW.SiteSetup.body).addClass('poster-builder-interface');

					var imgSrc = 'Img/posters/thumbs/' + posterName + '.png';
					_self.userNamePosition($('.name-placeholder'), posterName, true);
					_self.lightbox.fadeIn('slow');
					var $posterUserName = $(_self.posterUserName);
					var bitlyURL = TMW.UserVars.bitlyUrl ? TMW.UserVars.bitlyUrl : '';

					posterBuilder.show(imgSrc, posterName, $('.name-placeholder').text (), hasFace, bitlyURL, TMW.UserVars.coords, TMW.UserVars.userImageURL, TMW.UserVars.generatedImageURL);

					break;
			}
		},
		error : function(e) {
			// log(e.responseText);
		}
	});
}

function userNamePosition(target, posterName, isPosterBuilder) {
	var textLength = _self.userName.length;
	var basicMaxFont,
	basicMinFont,
	maxFont,
	minFont,
	scaleFactor,
	posterIDSuffix;

	if (isPosterBuilder) {
		if (TMW.ResponsiveControl.newBreakpoint >= TMW.ResponsiveControl.midMQ) {
			basicMaxFont = 32;
			basicMinFont = 18;
			maxFont = 83;
			minFont = 33;
			scaleFactor = 3.5;
			posterIDSuffix = '-pb';
		} else {
			basicMaxFont = 24;
			basicMinFont = 13.5;
			maxFont = 63;
			minFont = 25;
			scaleFactor = 3;
			posterIDSuffix = '-pb';
		}
	}
	else {
		basicMaxFont = 16;
		basicMinFont = 9;
		maxFont = 45;
		minFont = 18;
		scaleFactor = 2;
		posterIDSuffix = '';
	}

	switch (posterName) {
		case 'basic':
			target.attr('id', 'basic-name' + posterIDSuffix);
			target.text('Nothing beats ' + _self.userName.substring(0, 15) + '.');
			if (textLength < 8) {
				target.css('font-size', basicMaxFont - textLength);
			}
			else {
				target.css('font-size', basicMinFont);
			}
			break;
		case 'couple':
			target.attr('id', 'couple-name' + posterIDSuffix);
			target.text(_self.userName.substring(0, 15));
			if (textLength <= 12) {
				target.css('font-size', maxFont - (textLength * scaleFactor));
			}
			else if (textLength > 12) {
				target.css('font-size', minFont);
			}
			break;
		case 'face-chatup':
			target.attr('id', 'face-chatup-name' + posterIDSuffix);
			if (isPosterBuilder) target.text('Vote ' + _self.userName.substring(0, 15) + ' for Lynx Space Academy');
			// no name preview
			break;
		case 'movie-poster':
			target.attr('id', 'movie-poster-name' + posterIDSuffix);
			target.text(_self.userName.substring(0, 15));
			if (textLength <= 12) {
				target.css('font-size', maxFont - (textLength * scaleFactor));
			}
			else if (textLength > 12) {
				target.css('font-size', minFont);
			}
			break;
		case 'vote-lsa':
			target.attr('id', 'vote-lsa-name' + posterIDSuffix);
			target.text(_self.userName.substring(0, 15));
			if (textLength <= 12) {
				target.css('font-size', maxFont - (textLength * scaleFactor));
			}
			else if (textLength > 12) {
				target.css('font-size', minFont);
			}
			break;
	}
}

function updateNamePreview(posterName) {
	if ( !posterName ) posterName = 'vote-lsa';
	// log('updateNamePreview');
	_self.userName = $('#name').val();

	$('.name-preview').text(_self.userName);
	_self.namePreview = $('.roundabout-in-focus .name-preview, .mc-active .name-preview');

	if (_self.userName && _self.userName.length > 0) {
		_self.userNamePosition($('.name-preview'), posterName, false);
	}
	else {
		_self.namePreview = null;
	}
}
