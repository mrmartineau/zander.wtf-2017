var _self = this;
var overlayGS;
var helpPanelGS;
var helpPanelTextGS;

var TMW = window.TMW || {};

TMW.GimmeStatusPage = {
	_$document: $(document),
	facebookButtonIsClickable: false,
	SCROLL_TOP_PADDING: 20,
	detailsChangedAndNotSubmitted : false,
	lsaURL : $('#lsa-url-gs'),

	populatePage : function() { // fired from script.js after ajax call to user session JSON service
		
		log(TMW.UserVars);
		if (TMW.UserVars.status === 1 && TMW.UserVars.lsaURL.length > 0 && TMW.SessionState.urlIsLSAFormat) {
			// user's URL is already verified

			TMW.GimmeStatusPage.lsaURL.val (TMW.UserVars.lsaURL).addClass('is-valid');
			TMW.GimmeStatusPage.showFirstStatus();
		}
		else {

			$('#next-status, #status-panel .angled-button').hide();

			$('#lsa-check .form-placeholder').removeClass('is-valid');
			TMW.GimmeStatusPage.lsaURL.removeClass('is-valid');
			$('#submit-btn-gs').fadeIn('slow');

			TMW.GimmeStatusPage.lsaURL.val ('');
		}

	},

	resetLSAToPreviouslyStoredValueIfExists : function () {
		if (TMW.UserVars.status === 1 && TMW.UserVars.lsaURL.length > 0 && TMW.SessionState.previousUrlWasLSAFormat) {
			// user's previously stored URL was verified

			TMW.GimmeStatusPage.lsaURL.val (TMW.UserVars.lsaURL).addClass('is-valid');
		}
	},

	showPopup : function (msg) {
		_self.overlayGS.fadeToggle('slow');
		_self.helpPanelTextGS.text(msg);
		_self.helpPanelGS.css ({top: TMW.GimmeStatusPage._$document.scrollTop() + TMW.GimmeStatusPage.SCROLL_TOP_PADDING});
		_self.helpPanelGS.slideToggle('slow', function() {
			_self.helpPanelGS.css('color', '#fff');
		});
	},

	chooseStatus : function() {
		var
			randMsg    = Math.floor( Math.random() * TMW.GimmeStatusPage.Statuses.length ),
			msg        = TMW.GimmeStatusPage.Statuses[randMsg].replace('<bitly>', TMW.UserVars.bitlyUrl === null ? '' : TMW.UserVars.bitlyUrl ),
			twitterMsg = encodeURIComponent( msg )
		;


		$('.status-content h3').text( msg );
		TMW.Navigation.changeBodyHeight('gimme-status');

		$('#gimme-status-page .twitter').attr('href', 'twitter/tweet?text=' + twitterMsg );

		TMW.UserVars.gimmeStatusMsg = msg;
	},

	showFirstStatus : function() {
		$('#next-status, #status-panel .angled-button').fadeIn();
		$('#submit-btn-gs').hide ();
		$('#lsa-check .form-placeholder').addClass('is-valid');
		TMW.GimmeStatusPage.chooseStatus();
		TMW.Navigation.changeBodyHeight('gimme-status');
	},

	checkIfUserDetailsHaveChanged : function () {
		if (TMW.UserVars.status === 1 && !TMW.GimmeStatusPage.detailsChangedAndNotSubmitted)
		{
			log ("Gimme Status:: checkIfUserDetailsHaveChanged");

			if (TMW.GimmeStatusPage.lsaURL.val () === TMW.UserVars.lsaURL)
			{
				log ("Gimme Status:: checkIfUserDetailsHaveChanged... current url was already verified.");

				// the userName and URL are the same as they were previously, so reapply the
				// 'is-valid' class to the relevant elements.
				$('#lsa-check .form-placeholder').addClass('is-valid');
				TMW.GimmeStatusPage.lsaURL.addClass('is-valid');
				$('#submit-btn-gs').hide();

				TMW.GimmeStatusPage.detailsChangedAndNotSubmitted = false;

				return false;
			}
			else
			{
				// the URL has been changed and now needs to be submitted before the user can tweet.
				TMW.GimmeStatusPage.detailsChangedAndNotSubmitted = true;

				return true;
			}
		}

		// return true by default to account for before any user details have been submitted.
		return true;
	}
};

TMW.GimmeStatusPage.Statuses = [
	"So… I’m going to space. Well, I am if you vote for me: <bitly> #inspace",
	"Spaceman, I always wanted me to go into space, man. Help me get there: <bitly> #inspace",
	"Make yours truly a spaceman – vote for me here: <bitly> #inspace",
	"1) You vote for me here: <bitly>. 2) I go to space. 3) I’ll do anything you want me to. #inspace",
	"What’s on your mind? Space is on my mind. Help me get there: <bitly> #inspace",
	"“We are all in the gutter, but some of us are looking at the stars.” – Wilde. “Vote for me to go to space” – Me. <bitly> #inspace",
	"What are you up to? Not a lot? Great, vote for me to go to space… pretty please? <bitly> #inspace",
	"Send me to another planet. Well, part of the way there: <bitly> #inspace",
	"Ever wanted to send me 62 miles into the sky? Now you can – vote here: <bitly> #inspace",
	"“I’ve got a mate who’s been to space,” you’ll be able to say – if you vote for me here: <bitly> #inspace",
	"Here’s the deal – you vote for me to go to space, I take you out on the pull when I get back. <bitly> #inspace",
	"I want to go up in the world – well, out of it. Little help? Vote for me here: <bitly> #inspace",
	"Imagine my face, but in space. It would look amazing, right? Vote here to make it happen: <bitly> #inspace",
	"Help me get to space – and when I get back, you’ll be friends with a space hero. Imagine that… <bitly> #inspace",
	"I’ve found my holiday location for next year – space. Just need your help getting me there: <bitly> #inspace",
	"Corfu ’11. Tenerife ’12. Space ’13? Make my next holiday out of this world – vote here: <bitly> #inspace",
	"I bet you’ve never had the chance to put a mate in space before. Until now – vote for me here: <bitly> #inspace",
	"You have two choices – vote for me, or vote for me. The decision is yours. <bitly> #inspace",
	"Hey guys, I’ve found this amazing new site – check it out and, erm, hit vote while you’re at it? <bitly> #inspace",
	"Want to see me in a spacesuit? All you have to do is vote for me here: <bitly> #inspace",
	"Help me leave earth a man and come back a hero: <bitly> #inspace",
	"Lynx are sending someone to space. To make that ‘someone’ a ‘someone you know’, get voting for yours truly: <bitly> #inspace",
	"Lynx are putting someone in space. It could be anyone… it could even be… me. If you vote for me, that is: <bitly> #inspace",
	"You know what beats an astronaut? Nothing. So vote for me to go to space. <bitly> #inspace",
	"I haven’t been to space yet, but it’s on my list. Help me get there – vote here: <bitly> #inspace",
	"Fireman? Nah. Lifeguard? Jog on. We all know nothing beats an astronaut. And that astronaut could be me… <bitly> #inspace",
	"Enough about what’s for dinner. Let’s talk about what’s important – you voting for me to go to space: <bitly> #inspace",
	"Space – it’s out there. My voting page on lynxapollo.com – it’s also out there. Vote here: <bitly> #inspace",
	"Got mates who’ve been travelling? OK. Got mates who’ve been to space? Didn’t think so. Vote here please:  <bitly> #inspace",
	"Lynx’s latest competition is out of this world. Wanna send me to space with them? <bitly> #inspace",
	"One small vote by you, one giant trip for me. Go on… <bitly> #inspace",
	"Don’t make me beg. Alright, I’ll beg. Please, please, please vote for me to go to space: <bitly> #inspace",
	"If you had the chance to send me to space, would you do it? <bitly> #inspace"
];

(function($) {

	$(function() {
		TMW.SessionState.populateUserVars();
		// alert('document.ready');
		var lsaURL = $('#lsa-url-gs');
		_self.overlayGS = document.createElement('div');
		_self.overlayGS.className = 'overlay-gimme';
		_self.overlayGS = $(_self.overlayGS);

		$(TMW.SiteSetup.body).append(_self.overlayGS);

		_self.overlayGS.hide();

		_self.helpPanelGS = $('#help-panel-gs');
		_self.helpPanelTextGS = $('#help-text-gs');
		_self.helpPanelGS.hide();

		$('#lsa-url-help-gimme').on('click', function(e) {
			e.preventDefault();
			TMW.GimmeStatusPage.showPopup('Your L.S.A URL is the web address of your page on lynxapollo.com – for example: lynxapollo.com/en-GB/1234/your-name');
		});

		$('#help-panel-gimme').on('click', function() {
			_self.overlayGS.fadeOut('slow');
			_self.helpPanelGS.css('color', 'transparent');
			_self.helpPanelGS.slideUp('slow');

			if (!TMW.GimmeStatusPage.facebookButtonIsClickable)
			{
				$('body').off ('click', '.status-content .facebook', preventDefaultAction).on('click', '.status-content .facebook', facebookButtonClickHandler);
				TMW.GimmeStatusPage.facebookButtonIsClickable = true;
			}
		});

		$(_self.overlayGS).on('click', function(e) {
			e.preventDefault();
			_self.overlayGS.fadeOut('slow');
			_self.helpPanelGS.css('color', 'transparent');
			_self.helpPanelGS.slideUp('slow');

			if (!TMW.GimmeStatusPage.facebookButtonIsClickable)
			{
				$('body').off ('click', '.status-content .facebook', preventDefaultAction).on('click', '.status-content .facebook', facebookButtonClickHandler);
				TMW.GimmeStatusPage.facebookButtonIsClickable = true;
			}
		});

		lsaURL.on('focus', function(e) {
			if (TMW.UserVars.status === 1 && TMW.UserVars.lsaURL.length > 0 && TMW.SessionState.urlIsLSAFormat)
			{
				$('#lsa-check .form-placeholder').removeClass('is-valid');
				lsaURL.removeClass('is-valid');
				$('#submit-btn-gs').fadeIn('slow');
			}
		});

		lsaURL.on('blur', function(e) {

			log ('GimmeStatus lsa url text field blur.');

			TMW.GimmeStatusPage.checkIfUserDetailsHaveChanged ();		
		});

		$('#lsa-check form').on('submit', function(e) {
			e.preventDefault();

			log ('GimmeStatus form submit');

			if (TMW.UserVars.status === 1 && !TMW.GimmeStatusPage.checkIfUserDetailsHaveChanged ()) { // only run LSA URL check if the URL has changed
				log ('GimmeStatus form submit:: URL already verified... showing popup.');
				TMW.GimmeStatusPage.showPopup('The URL you have provided was already verified.');
			}
			else {
				TMW.SessionState.SaveLSADetails(TMW.GimmeStatusPage.lsaURL, _self.overlayGS, _self.helpPanelGS, _self.helpPanelTextGS);
			}
		});

		if ( TMW.UserVars.status === 1 ) {
			TMW.GimmeStatusPage.chooseStatus();
			TMW.SessionState.populateUserVars();
		}

		$('body').on('click', '#next-status', function() {
			TMW.GimmeStatusPage.chooseStatus();
		});

		function facebookButtonClickHandler (e) {
			e.preventDefault();

			$('body').off('click', '.status-content .facebook', facebookButtonClickHandler).on ('click', '.status-content .facebook', preventDefaultAction);
			TMW.GimmeStatusPage.facebookButtonIsClickable = false;

			function gimmeStatusDetailsSaveCompleteSignalHandler() {
				TMW.SessionState.gimmeStatusDetailsSaveCompleteSignal.remove (gimmeStatusDetailsSaveCompleteSignalHandler);
				TMW.SessionState.gimmeStatusDetailsSaveErrorSignal.remove (gimmeStatusDetailsSaveErrorSignalHandler);

				log("gimme-status-interface:: [gimmeStatusDetailsSaveCompleteSignalHandler]");

				// Check Facebook is authd and then post to feed...

				TMW.Facebook.checkAuthStatusSignal.add (checkAuthStatusSignalHandler);
				TMW.Facebook.checkAuthStatus ();
			}

			function gimmeStatusDetailsSaveErrorSignalHandler () {
				TMW.SessionState.gimmeStatusDetailsSaveCompleteSignal.remove (gimmeStatusDetailsSaveCompleteSignalHandler);
				TMW.SessionState.gimmeStatusDetailsSaveErrorSignal.remove (gimmeStatusDetailsSaveErrorSignalHandler);
				log("gimme-status-interface:: [gimmeStatusDetailsSaveErrorSignalHandler]");

				TMW.GimmeStatusPage.showPopup ("Something's gone wrong, please try again :(");
			}

			function checkAuthStatusSignalHandler (userIsAuthd) {
				TMW.Facebook.checkAuthStatusSignal.remove (checkAuthStatusSignalHandler);

				if (userIsAuthd) {
					TMW.Facebook.checkPermissionsSignal.add (checkPermissionsSignalHandler);
					TMW.Facebook.checkPermissions (["publish_stream"]);
				} else {
					TMW.Facebook.login (true);
				}
			}

			function checkPermissionsSignalHandler (permissionsAllPresent) {

				TMW.Facebook.checkPermissionsSignal.remove (checkPermissionsSignalHandler);

				if (permissionsAllPresent) {
					var data = {
						name: "Lynx Apollo Vote Boosters",
						link: TMW.UserVars.bitlyUrl,
						description: TMW.UserVars.gimmeStatusMsg,
						picture: "http://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v43/81/116339368540077/app_115_116339368540077_395510164.png"
					};

					TMW.Facebook.postToFeedSuccessSignal.add (postToFeedSuccessSignalhandler);
					TMW.Facebook.postToFeedErrorSignal.add (postToFeedErrorSignalhandler);
					TMW.Facebook.postToFeed (data, true);
				} else {
					TMW.Facebook.login (true);
				}
			}

			function postToFeedSuccessSignalhandler () {
				TMW.Facebook.postToFeedSuccessSignal.remove (postToFeedSuccessSignalhandler);
				TMW.Facebook.postToFeedErrorSignal.remove (postToFeedErrorSignalhandler);

				log("gimme-status-interface:: [postToFeedSuccessSignalhandler]");

				TMW.GimmeStatusPage.showPopup ("Your status message was posted successfully. You're awesome!");
			}

			function postToFeedErrorSignalhandler () {
				TMW.Facebook.postToFeedSuccessSignal.remove (postToFeedSuccessSignalhandler);
				TMW.Facebook.postToFeedErrorSignal.remove (postToFeedErrorSignalhandler);

				log("gimme-status-interface:: [postToFeedErrorSignalhandler]");

				TMW.GimmeStatusPage.showPopup ("There was a problem posting your status message, please try again.");
			}

			TMW.SessionState.gimmeStatusDetailsSaveCompleteSignal.add (gimmeStatusDetailsSaveCompleteSignalHandler);
			TMW.SessionState.gimmeStatusDetailsSaveErrorSignal.add (gimmeStatusDetailsSaveErrorSignalHandler);
			TMW.SessionState.SaveStatusDetails ();
		}

		$('body').on('click', '.status-content .facebook', facebookButtonClickHandler);
		TMW.GimmeStatusPage.facebookButtonIsClickable = true;

		function preventDefaultAction (event)
		{
			event.preventDefault ? event.preventDefault () : event.returnValue = false;
			event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;
		}
	});

})(jQuery);


// console.log('RUNNIN GIMME STATUS SCRIPT AGAIN');
