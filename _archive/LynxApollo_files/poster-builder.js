/*jslint sloppy: true, white: true, browser: true, devel: true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:false, bitwise:true, strict:false, curly:false, browser:true, indent:4, maxerr:50, white:false, smarttabs:false */

TMW = window.TMW || {};

TMW.PosterBuilder = function ()
{
	this.POSTER_TRANSPARENCY_POINT_PADDING = 20;
    this.SCROLL_TOP_PADDING = 20;

    if (TMW.ResponsiveControl.isMobile)
    {
        this.POSTER_TRANSPARENCY_POINT_VO_BASIC = {centrePosX:125, centrePosY:220, minPosX:90, minPosY:177, maxPosX:164, maxPosY:264};
        this.POSTER_TRANSPARENCY_POINT_VO_COUPLE = {centrePosX:124, centrePosY:49, minPosX:114, minPosY:38, maxPosX:138, maxPosY:65};
        this.POSTER_TRANSPARENCY_POINT_VO_FACE_CHATUP = {centrePosX:125, centrePosY:151, minPosX:110, minPosY:131, maxPosX:144, maxPosY:168};
    }
    else
    {
        this.POSTER_TRANSPARENCY_POINT_VO_BASIC = {centrePosX:175, centrePosY:306, minPosX:127, minPosY:254, maxPosX:230, maxPosY:366};
        this.POSTER_TRANSPARENCY_POINT_VO_COUPLE = {centrePosX:175, centrePosY:67, minPosX:162, minPosY:57, maxPosX:193, maxPosY:91};
        this.POSTER_TRANSPARENCY_POINT_VO_FACE_CHATUP = {centrePosX:175, centrePosY:210, minPosX:155, minPosY:187, maxPosX:200, maxPosY:235};
    }

	this.uploadPopupPanelIsDisplayed;

	this._$document;
	this._$body;
	this._$posterPlaceholder;
	this._$poster;

	this.initialised;

	// ------------------- //
	// -- UPLOAD STATE -- //
	this._$uploadPanel;
	this._$uploadPhotoButton;
    this._$uploadOr;
	this._$profilePhotoButton;
	this._$uploadPopupPanel;
	this._$closeUploadPopupPanel;
	this._$uploadImageForm;
	this._$submitImageButton;
	// ------------------- //

	// -- EDIT STATE -- //
	this._$editPanel;
	this._$imageScaleBarContainer;
	this._$imageScaleBarButtonContainer;
	this._$imageScaleBarButton;
	this._$userImageContainer;
	this._$doneEditingButton;
	this._$changeImageButton;
	// ------------------- //

	// ------------------- //
	// -- SHARE STATE -- //
	this._$sharePanel;
	this._$postToFacebookButton;
	this._$tweetButton;
	this._$downloadImageButton;
	this._$popupBackground;
	// ------------------- //

	this._touchSupported;
	this._mouseEventString;
	this._scalableImage;
	this._previousScaleBarPosX;
	this._minScaleBarPosX;
	this._maxScaleBarPosX;
	this._previousUserImageMousePosX;
	this._previousUserImageMousePosY;
	this._posterName;
	this._posterText;
	this._currentPosterTransparencyPointVO;
	this._generatedImageURL;
	this._bitlyURL;
}

TMW.PosterBuilder.constructor = TMW.PosterBuilder;

TMW.PosterBuilder.prototype.init = function ()
{
	var self = this;

	if (this.initialised) return;

	this._$document = $(document);
    this._$body = $(document.body);

	this._touchSupported = "ontouchstart" in window ? true : false;
	this._mouseEventString = this._touchSupported ? "touchstart" : "mousedown";

	this._$posterPlaceholder = $("#poster-placeholder");
	this._$poster = $("#poster-big");
	this._$uploadPanel = $("#lb-panel .upload-panel");
	this._$uploadPopupPanel = $("#upload-popup-panel");
	this._$closeUploadPopupPanel = $('#close-image-upload');
	this._$uploadImageForm = $("#upload-popup-panel #upload-image-form");
	this._$submitImageButton = $("#upload-popup-panel #submit-image");
	this._$editPanel = $("#lb-panel .edit-panel");
	this._$sharePanel = $("#lb-panel .share-panel");
	this._$uploadPhotoButton = $("#upload-photo-btn");
    this._$uploadOr = $("#upload-or");
	this._$profilePhotoButton = $("#profile-photo-btn");
	this._$postToFacebookButton = $("#post-to-facebook-btn");
	this._$tweetButton = $("#tweet-btn");
	this._$downloadImageButton = $("#download-btn");

	this._$popupBackground = $(document.createElement ("div"));
	this._$popupBackground.addClass ("poster-builder-popup-background");
	this._$popupBackground.hide ();
	this._$body.append (this._$popupBackground);

	this._$imageScaleBarContainer = $("#image-scale-bar-container");
	this._$imageScaleBarButtonContainer = $("#image-scale-bar-button-container");
	this._$imageScaleBarButton = $("#image-scale-bar-button");
	this._$userImageContainer = $("#user-image-container");

	this._$doneEditingButton = $("#done-editing-btn");
	this._$changeImageButton = $("#change-image-btn");

	this._minScaleBarPosX = 0;
	this._maxScaleBarPosX = this._$imageScaleBarButtonContainer.width () - this._$imageScaleBarButton.width ();
	this._previousScaleBarPosX = this._minScaleBarPosX;
	this._scalableImage = new ScalableImage ();

	this._$uploadPopupPanel.hide ();
	this._$imageScaleBarContainer.hide ();
	this._scalableImage.parentClassScope = this;
    this._scalableImage.isMobile = TMW.ResponsiveControl.isMobile;
	this._scalableImage.init (self._$userImageContainer);
	this._$uploadImageForm.ajaxForm ({dataType:"json", success:function (response){self.imageUploadCompleteHandler (self, response.Status);}, error:function (error){self.imageUploadErrorHandler (self, error);}});

	this.initialised = true;
}

TMW.PosterBuilder.prototype.show = function (posterImageURL, posterName, posterText, hasFace, bitlyURL, coords, userImageURL, generatedImageURL)
{
	var self = this;

	if (self._posterBuilderVisible) return;

	self._posterBuilderVisible = true;
	self._posterName = posterName;
	self._posterText = posterText;
	self._bitlyURL = bitlyURL;
	self._generatedImageURL = generatedImageURL;

	self._$poster.css("background-image", "url('" + posterImageURL + "')");

	// hide edit panel.
	self._$editPanel.hide ();

	if (hasFace)
	{
		log ("PosterBuilder:: [show] poster has face");

		switch (self._posterName)
		{
			case "basic" :
					self._currentPosterTransparencyPointVO = self.POSTER_TRANSPARENCY_POINT_VO_BASIC;
					log ("basic poster");
					break;
			case "couple" :
					self._currentPosterTransparencyPointVO = self.POSTER_TRANSPARENCY_POINT_VO_COUPLE;
					log ("couple poster");
					break;
			case "face-chatup" :
					self._currentPosterTransparencyPointVO = self.POSTER_TRANSPARENCY_POINT_VO_FACE_CHATUP;
					log ("face-chatup poster");
					break;
		}

		if (coords && typeof (coords) !== "undefined" && coords !== "" && coords !== "NaN,NaN,NaN,NaN")
		{
			// hide upload panel, show share panel.
			self._$sharePanel.show ();
			self._$uploadPanel.hide ();

			self._userImageURL = userImageURL;

			self._$postToFacebookButton.on (self._mouseEventString, {classScope:self}, self.postToFacebookButtonClickHandler);
			// FIXME: Default text needs to be changed
			self._$tweetButton.attr ("href", "twitter/tweet?text=Vote%20for%20me&imageurl=" + self._generatedImageURL);
			self._$downloadImageButton.on (self._mouseEventString, {classScope:self}, self.downloadImageButtonClickHandler);

            log ("PosterBuilder:: [show] coords: " + coords);

			var coordsArray = coords.split (",");
			var x = self._scalableImage.getIntDecreasedByPercentage (Number (coordsArray[0]), self._scalableImage.scaleRatioPercentage);
			var y = self._scalableImage.getIntDecreasedByPercentage (Number (coordsArray[1]), self._scalableImage.scaleRatioPercentage);
			var w = self._scalableImage.getIntDecreasedByPercentage (Number (coordsArray[2]), self._scalableImage.scaleRatioPercentage);
			var h = self._scalableImage.getIntDecreasedByPercentage (Number (coordsArray[3]), self._scalableImage.scaleRatioPercentage);

			log ("PosterBuilder:: [show] coords to position user image... \n x:" + x + " y:" + y + " w:" + w + " h:" + h);

			function scalableImageLoaded ()
			{
				var centrePosX = x + (self._scalableImage.currentWidth * .5);
				var centrePosY = y + (self._scalableImage.currentHeight * .5);

				self._$userImageContainer.css ({left: centrePosX, top: centrePosY});
			}

			self._scalableImage.scalableImageLoadCompleteSignal.add (scalableImageLoaded);
			self._scalableImage.loadImage (self._userImageURL, w, h);

			TMW.UserVars.currentPoster = "";
			TMW.SessionState.SavePosterDetails (self._posterName, null, "", "");
		}
		else
		{
			log ("PosterBuilder:: [show] coords not found");

			// show upload panel, hide share panel
			self._$uploadPanel.show ();
			self._$sharePanel.hide ();

			if (Modernizr.fileinput)
			{
					self._$uploadPhotoButton.on (self._mouseEventString, {classScope:self}, self.uploadPhotoButtonClickHandler);
			}
			else
			{
					self._$uploadPhotoButton.hide ();
                    self._$uploadOr.hide ();
			}

			self._$profilePhotoButton.on (self._mouseEventString, {classScope:self}, self.profilePhotoButtonClickHandler);

			self._$userImageContainer.css ({left: self._currentPosterTransparencyPointVO.centrePosX, top: self._currentPosterTransparencyPointVO.centrePosY});
		}
	}
	else
	{
		log ("PosterBuilder:: [show] poster has no face");

		// hide upload panel, show share panel.
		self._$uploadPanel.hide ();

		function generatePosterComplete (data)
		{
			//log("PosterBuilder:: [generatePosterComplete]");
			self._generatedImageURL = data.ImageUrl;
			setTimeout (function () {self.showShareState (self);}, 500);
		}

		function generatePosterError (response)
		{
			log ("PosterBuilder:: [generatePosterError]");
			self.showPopup ("Something went wrong with generating this poster, please try another.");
		}

		$.ajax({
		type: "GET",
		url: self._posterName + "/generate?coords=0,0,0,0&text=" + self._posterText + "&bitlyUrl=" + self._bitlyURL,
		success: generatePosterComplete,
		error: generatePosterError
		});
	}

	// Scroll the page IF we are on mobile
	if (TMW.ResponsiveControl.isMobile)
	{
		// log('Animate Scroll');
		var topOffset = $('#poster-boy-page .lb').offset().top;
		self._$body.animate({height : 1200}, 'slow', function() {self._$document.scrollTop (topOffset - self.SCROLL_TOP_PADDING)});
	}
};

TMW.PosterBuilder.prototype.hide = function ()
{
	log ("PosterBuilder:: [hide]");

	var self = this;

	if (!self._posterBuilderVisible) return;

	self._posterBuilderVisible = false;

	// hide the loader display for every element stored in the dictionary.
	TMW.Status.hideLoaderForAllStoredElements ();

	// ------------------------------------------------ //
	// upload state
	// ------------------------------------------------ //
	if (Modernizr.fileinput)
	{
		self._$uploadPhotoButton.off ();
		self._$submitImageButton.off ();
		self._$closeUploadPopupPanel.off ();
	}

	self._$profilePhotoButton.off ();

	if (self.uploadPopupPanelIsDisplayed) self.hideUploadPopupPanel (self);
	// ------------------------------------------------ //


	// ------------------------------------------------ //
	// edit state
	// ------------------------------------------------ //
	self._scalableImage.clearImage ();
	self._$imageScaleBarContainer.fadeOut ();

	self._$imageScaleBarButton.off ();
	self._$posterPlaceholder.off ();
	self._$doneEditingButton.off ();
	self._$changeImageButton.off ();
	// ------------------------------------------------ //


	// ------------------------------------------------ //
	// share state
	// ------------------------------------------------ //
	self._$postToFacebookButton.off ();
	self._$downloadImageButton.off ();
	// ------------------------------------------------ //

	// Scroll the page IF we are on mobile
	if (TMW.ResponsiveControl.isMobile) {
		self._$document.scrollTop (0);
		// $(window).trigger('resize');
		TMW.Navigation.changeBodyHeight('poster-boy');
	}
};

TMW.PosterBuilder.prototype.hideUploadPopupPanel = function (classScope)
{
	log ("PosterBuilder:: [hideUploadPopupPanel]");
	var self = classScope;

	self._$submitImageButton.off (self._mouseEventString, self.submitImageButtonClickHandler);
	self._$uploadPopupPanel.fadeOut ();
	self.uploadPopupPanelIsDisplayed = false;
};

TMW.PosterBuilder.prototype.uploadPhotoButtonClickHandler = function (event)
{
	var self = event.data.classScope;
    // FIXME : use private var reference if possible (it had incorrect vals so we swapped it for this inefficient call).
	var scrollTopVal = self._$document.scrollTop ();

    log ("PosterBuilder:: [uploadPhotoButtonClickHandler] scrollTopVal: " + scrollTopVal);

	self._$uploadPhotoButton.off ();
	self._$profilePhotoButton.off ();

	self.uploadPopupPanelIsDisplayed = true;

	self._$uploadPopupPanel.fadeIn().css({top: scrollTopVal + self.SCROLL_TOP_PADDING});

	self._$submitImageButton.on (self._mouseEventString, {classScope:self}, self.submitImageButtonClickHandler);
	self._$closeUploadPopupPanel.on (self._mouseEventString, closeUploadPopupPanelClickHandler);

	function closeUploadPopupPanelClickHandler (event)
	{
		event.preventDefault ();
		self._$closeUploadPopupPanel.off ();
		self.hideUploadPopupPanel (self);

		self._$uploadPhotoButton.on (self._mouseEventString, {classScope:self}, self.uploadPhotoButtonClickHandler);
		self._$profilePhotoButton.on (self._mouseEventString, {classScope:self}, self.profilePhotoButtonClickHandler);

		return false;
	}
};

TMW.PosterBuilder.prototype.submitImageButtonClickHandler = function (event)
{
    event.preventDefault ? event.preventDefault () : event.returnValue = false;

	var self = event.data.classScope;

	self._$submitImageButton.off ();
	self._$closeUploadPopupPanel.off ();

	// set the 'action' attribute to the API address and then trigger the form submission.
	self._$uploadImageForm.attr ("action", self._posterName + "/set").submit ();

	// add loading display.
	TMW.Status.showLoaderForElement (self._$uploadPhotoButton);

	self.hideUploadPopupPanel (self);

    return false;
};

TMW.PosterBuilder.prototype.imageUploadCompleteHandler = function (classScope, status)
{
	var self = classScope;

    log ("PosterBuilder:: [imageUploadCompleteHandler] typeof (status): " + typeof (status) + " status: " + status);

	if (status == "1")
	{
		log ("PosterBuilder:: [imageUploadCompleteHandler] upload ok.");

		self._userImageURL = self._posterName + "/get";

		// load user image that was just uploaded to the server.
		self._scalableImage.scalableImageLoadCompleteSignal.add (self.scalableImageLoadCompleteSignalHandler);
		self._scalableImage.loadImage (self._userImageURL);
	}
	else
	{
		log ("PosterBuilder:: [imageUploadCompleteHandler] upload not ok.");

		self.showPopup ("There was a problem with your upload, please try again or use the 'profile image' option instead.");

		// remove loading display, as user can now retry upload, or use profile image instead.
		TMW.Status.hideLoaderForElement (self._$uploadPhotoButton);

		self._$uploadPhotoButton.on (self._mouseEventString, {classScope:self}, self.uploadPhotoButtonClickHandler);
		self._$profilePhotoButton.on (self._mouseEventString, {classScope:self}, self.profilePhotoButtonClickHandler);
	}
};

TMW.PosterBuilder.prototype.imageUploadErrorHandler = function (classScope, error)
{
	var self = classScope;

	log ("PosterBuilder:: [imageUploadErrorHandler] error = " + error);

	self.showPopup ("There was a problem with your upload, please try again or use the 'profile image' option instead.");

	// remove loading display, as user can now retry upload, or use profile image instead.
	TMW.Status.hideLoaderForElement (self._$uploadPhotoButton);

	self._$uploadPhotoButton.on (self._mouseEventString, {classScope:self}, self.uploadPhotoButtonClickHandler);
	self._$profilePhotoButton.on (self._mouseEventString, {classScope:self}, self.profilePhotoButtonClickHandler);
};

TMW.PosterBuilder.prototype.scalableImageLoadCompleteSignalHandler = function (classScope)
{
	log ("PosterBuilder:: [scalableImageLoadCompleteSignalHandler]");

	var self = classScope;

	self._scalableImage.scalableImageLoadCompleteSignal.remove (self.scalableImageLoadCompleteSignalHandler);

	// hide loader display. We could have come from either the FB button, or the upload button, so call the hide loader method on both objects.
	TMW.Status.hideLoaderForElement (self._$uploadPhotoButton);
	TMW.Status.hideLoaderForElement (self._$profilePhotoButton);

	self._$uploadPanel.fadeOut ();

	setTimeout (function (){self.showEditState (self);}, 500);
};

TMW.PosterBuilder.prototype.profilePhotoButtonClickHandler = function (event)
{
	var self = event.data.classScope;
	var profilePicURL;

	// add loader display.
	TMW.Status.showLoaderForElement (self._$profilePhotoButton);

	self._$profilePhotoButton.off ();
	if (Modernizr.fileinput) self._$uploadPhotoButton.off ();

	TMW.SessionState.posterDetailsSaveCompleteSignal.add (posterDetailsSaveCompleteSignalHandler);
	TMW.SessionState.posterDetailsSaveErrorSignal.add (posterDetailsSaveCompleteSignalHandler);
	TMW.SessionState.SavePosterDetails (self._posterName);

	function posterDetailsSaveCompleteSignalHandler (response)
	{
		TMW.SessionState.posterDetailsSaveCompleteSignal.remove (posterDetailsSaveCompleteSignalHandler);
		TMW.SessionState.posterDetailsSaveErrorSignal.remove (posterDetailsSaveCompleteSignalHandler);

		TMW.Facebook.checkAuthStatusSignal.add (checkAuthStatusSignalHandler);
		TMW.Facebook.checkAuthStatus ();

		log ("PosterBuilder:: [posterDetailsSaveCompleteSignalHandler]");
	}

	function posterDetailsSaveErrorSignalHandler (errorResponseText)
	{
		TMW.SessionState.posterDetailsSaveCompleteSignal.remove (posterDetailsSaveCompleteSignalHandler);
		TMW.SessionState.posterDetailsSaveErrorSignal.remove (posterDetailsSaveCompleteSignalHandler);

		log ("PosterBuilder:: [posterDetailsSaveErrorSignalHandler] error: " + errorResponseText);

		// remove loading display, as user can now retry using profile pic, or use image upload instead.
		TMW.Status.hideLoaderForElement (self._$profilePhotoButton);

		self._$uploadPhotoButton.on (self._mouseEventString, {classScope:self}, self.uploadPhotoButtonClickHandler);
		self._$profilePhotoButton.on (self._mouseEventString, {classScope:self}, self.profilePhotoButtonClickHandler);

		self.showPopup ("Something went wrong, please try again or use the 'upload photo' option instead.");
	}

	function checkAuthStatusSignalHandler (userIsAuthd)
	{
		TMW.Facebook.checkAuthStatusSignal.remove (checkAuthStatusSignalHandler);

		if (userIsAuthd)
		{
			TMW.Facebook.profilePicURLSignal.add (profilePicURLSignalHandler);
			TMW.Facebook.getProfilePicURL ("5000");
		}
		else
		{
			// the user is not logged in so send them to Facebook to do so, after which they will be redirected back to the app.
			TMW.Facebook.login (true);
		}
	}

	function profilePicURLSignalHandler (url)
	{
		TMW.Facebook.profilePicURLSignal.remove (profilePicURLSignalHandler);

		self._userImageURL = url;
		log ("PosterBuilder:: [profilePicURLSignalHandler] profile pic url received: " + self._userImageURL);

		// upload profile pic URL to the server.
		$.ajax ({type:"GET", url: self._posterName + "/set", data:{imageUrl:self._userImageURL}, success:setImageURLComplete, error: setImageURLError});
	}

	function setImageURLComplete (response)
	{
		log ("PosterBuilder:: [setImageURLComplete]");

		self._scalableImage.scalableImageLoadCompleteSignal.add (self.scalableImageLoadCompleteSignalHandler);
		self._scalableImage.loadImage (self._userImageURL);

		self._$imageScaleBarButton.css ("left", (self._maxScaleBarPosX - self._$imageScaleBarButton.width ()) * 0.5);
	}

	function setImageURLError (XMLHttpRequest, textStatus, errorThrown)
	{
		// remove loading display, as user can now retry using profile pic, or use image upload instead.
		TMW.Status.hideLoaderForElement (self._$profilePhotoButton);

		self._$uploadPhotoButton.on (self._mouseEventString, {classScope:self}, self.uploadPhotoButtonClickHandler);
		self._$profilePhotoButton.on (self._mouseEventString, {classScope:self}, self.profilePhotoButtonClickHandler);

		self.showPopup ("There was a problem getting you Facebook profile image, please try again or use the 'upload photo' option instead");

		log ("PosterBuilder:: [setImageURLError]");
	}
};

TMW.PosterBuilder.prototype.doneEditingButtonMouseDownHandler = function (event)
{
	var self = event.data.classScope;

	self._$doneEditingButton.off ();
	self._$changeImageButton.off ();
	self._$imageScaleBarButton.off ();
	self._$posterPlaceholder.off ();
	self._$imageScaleBarContainer.fadeOut ();

    var userImageData = {};
    userImageData.x = self._scalableImage.getIntIncreasedByPercentage (self._$userImageContainer.position ().left - (self._scalableImage.currentWidth * 0.5), self._scalableImage.scaleRatioPercentage);
    userImageData.y = self._scalableImage.getIntIncreasedByPercentage (self._$userImageContainer.position ().top - (self._scalableImage.currentHeight * 0.5), self._scalableImage.scaleRatioPercentage);
    userImageData.w = self._scalableImage.getIntIncreasedByPercentage (self._scalableImage.currentWidth, self._scalableImage.scaleRatioPercentage);
    userImageData.h = self._scalableImage.getIntIncreasedByPercentage (self._scalableImage.currentHeight, self._scalableImage.scaleRatioPercentage);

	log ("PosterBuilder:: [doneEditingButtonMouseDownHandler] creating data to send to server... x:" + userImageData.x + " y:" + userImageData.y + " w:" + userImageData.w + " h:" + userImageData.h);

	// add loader display.
	TMW.Status.showLoaderForElement (self._$doneEditingButton);

	function generatePosterComplete (data)
	{
		log ("PosterBuilder:: [generatePosterComplete] data.ImageUrl = " + data.ImageUrl);
		self._generatedImageURL = data.ImageUrl;

		// hide loader display.
		TMW.Status.hideLoaderForElement (self._$doneEditingButton);

		self._$editPanel.fadeOut ();
		setTimeout (function () {self.showShareState (self);}, 500);
	}

	function generatePosterError (response)
	{
		log ("PosterBuilder:: [generatePosterError]");

		TMW.Status.hideLoaderForElement (self._$doneEditingButton);

		self.showEditState (self);

		self.showPopup ("Something went wrong with generating this poster, please try again.");
	}

	// Get generated image url
	$.ajax({
		type: "GET",
		url: self._posterName + "/generate?coords=" + userImageData.x + "," + userImageData.y + "," + userImageData.w + "," + userImageData.h + "&text=" + self._posterText + "&bitlyUrl=" + self._bitlyURL,
		success: generatePosterComplete,
		error: generatePosterError
	});
};

TMW.PosterBuilder.prototype.postToFacebookButtonClickHandler = function (event)
{
	var self = event.data.classScope;

	self._$postToFacebookButton.off ();

	// add loader display.
	TMW.Status.showLoaderForElement (self._$postToFacebookButton);

	function checkAuthStatusSignalHandler (userIsAuthd)
	{
		TMW.Facebook.checkAuthStatusSignal.remove (checkAuthStatusSignalHandler);

		if (userIsAuthd)
		{
			TMW.Facebook.checkPermissionsSignal.add (facebookCheckPermissionsSignalHandler);
			TMW.Facebook.checkPermissions (["publish_stream", "user_photos"]);
		}
		else
		{
			var userImageData = {};
            userImageData.x = self._scalableImage.getIntIncreasedByPercentage (self._$userImageContainer.position ().left - (self._scalableImage.currentWidth * 0.5), self._scalableImage.scaleRatioPercentage);
            userImageData.y = self._scalableImage.getIntIncreasedByPercentage (self._$userImageContainer.position ().top - (self._scalableImage.currentHeight * 0.5), self._scalableImage.scaleRatioPercentage);
            userImageData.w = self._scalableImage.getIntIncreasedByPercentage (self._scalableImage.currentWidth, self._scalableImage.scaleRatioPercentage);
            userImageData.h = self._scalableImage.getIntIncreasedByPercentage (self._scalableImage.currentHeight, self._scalableImage.scaleRatioPercentage);

			TMW.SessionState.posterDetailsSaveCompleteSignal.add (posterDetailsSaveCompleteSignalHandler);
			TMW.SessionState.posterDetailsSaveErrorSignal.add (posterDetailsSaveErrorSignalHandler);

			log ("PosterBuilder:: [postToFacebookButtonClickHandler --> checkAuthStatusSignalHandler] saving poster details..." + "\n --> self._generatedImageURL: " + self._generatedImageURL);

			TMW.SessionState.SavePosterDetails (self._posterName, userImageData, self._generatedImageURL, self._userImageURL);
		}
	}

	TMW.Facebook.checkAuthStatusSignal.add (checkAuthStatusSignalHandler);
	TMW.Facebook.checkAuthStatus ();

	function facebookCheckPermissionsSignalHandler (permissionsAllAvailable)
	{
		TMW.Facebook.checkPermissionsSignal.remove (facebookCheckPermissionsSignalHandler);

		log ("PosterBuilder:: [postToFacebookButtonClickHandler -> facebookCheckPermissionsSignalHandler] permissionsAllAvailable: " + permissionsAllAvailable);

		if (!permissionsAllAvailable)
		{
            var userImageData = {};
            userImageData.x = self._scalableImage.getIntIncreasedByPercentage (self._$userImageContainer.position ().left - (self._scalableImage.currentWidth * 0.5), self._scalableImage.scaleRatioPercentage);
            userImageData.y = self._scalableImage.getIntIncreasedByPercentage (self._$userImageContainer.position ().top - (self._scalableImage.currentHeight * 0.5), self._scalableImage.scaleRatioPercentage);
            userImageData.w = self._scalableImage.getIntIncreasedByPercentage (self._scalableImage.currentWidth, self._scalableImage.scaleRatioPercentage);
            userImageData.h = self._scalableImage.getIntIncreasedByPercentage (self._scalableImage.currentHeight, self._scalableImage.scaleRatioPercentage);

			TMW.SessionState.posterDetailsSaveCompleteSignal.add (posterDetailsSaveCompleteSignalHandler);
			TMW.SessionState.posterDetailsSaveErrorSignal.add (posterDetailsSaveErrorSignalHandler);

			log ("PosterBuilder:: [postToFacebookButtonClickHandler --> facebookCheckPermissionsSignalHandler] saving poster details..." + "\n --> self._generatedImageURL: " + self._generatedImageURL);

			TMW.SessionState.SavePosterDetails (self._posterName, userImageData, self._generatedImageURL, self._userImageURL);
		}
		else
		{
			if (!self._generatedImageURL || self._generatedImageURL == "") self._generatedImageURL = TMW.UserVars.generatedImageURL;

			function postToPhotosSuccessSignalHandler (photoID, postID)
			{
				TMW.Facebook.postToPhotosSuccessSignal.remove (postToPhotosSuccessSignalHandler);
				TMW.Facebook.postToPhotosErrorSignal.remove (postToPhotosErrorSignalHandler);

				log ("successfully posted to feed!");

				// remove loader display.
				TMW.Status.hideLoaderForElement (self._$postToFacebookButton);

				self.showPopup ("Photo posted successfully. You're awesome!");

				//var photoPostTagObject = TMW.Facebook.createTagObject (TMW.Facebook.userID, self._currentPosterTransparencyPointVO.minPosX, self._currentPosterTransparencyPointVO.minPosY);
				//TMW.Facebook.tagPhoto (photoID, [photoPostTagObject]);

				_gaq.push(['_trackEvent', 'Poster Boy', 'Share poster on Facebook']);

				// FIXME : grey out FB share button to show user it is now disabled, since it has been used already.
			}

			function postToPhotosErrorSignalHandler (response)
			{
				TMW.Facebook.postToPhotosSuccessSignal.remove (postToPhotosSuccessSignalHandler);
				TMW.Facebook.postToPhotosErrorSignal.remove (postToPhotosErrorSignalHandler);

				log ("error posting to feed: " + response.error.message);

				self.showPopup ("There was a problem posting your photo, please try again.");

				// remove loader display.
				TMW.Status.hideLoaderForElement (self._$postToFacebookButton);

				// re-enable FB share button so user can try again.
				self._$postToFacebookButton.on (self._mouseEventString, {classScope:self}, self.postToFacebookButtonClickHandler);
			}

			log("PosterBuilder:: [postToFacebookButtonClickHandler --> facebookCheckPermissionsSignalHandler] posting to photos... \n -> TMW.Facebook.userID = " + TMW.Facebook.userID + " \n -> self._generatedImageURL = " + self._generatedImageURL);

			TMW.Facebook.postToPhotosSuccessSignal.add (postToPhotosSuccessSignalHandler);
			TMW.Facebook.postToPhotosErrorSignal.add (postToPhotosErrorSignalHandler);

			var photoPostMessage = "Lynx Apollo Vote Boosters" +  "\n\n" + "Check out my very own Lynx Apollo astronaut poster – \n and send me to space with Lynx. " + self._bitlyURL;

			TMW.Facebook.postToPhotos (self._generatedImageURL, photoPostMessage);
		}
	}

	function posterDetailsSaveCompleteSignalHandler (response)
	{
		TMW.SessionState.posterDetailsSaveCompleteSignal.remove (posterDetailsSaveCompleteSignalHandler);
		TMW.SessionState.posterDetailsSaveErrorSignal.remove (posterDetailsSaveErrorSignalHandler);

		log("PosterBuilder:: [postToFacebookButtonClickHandler -> posterDetailsSaveCompleteSignalHandler] \n --> self._generatedImageURL = " + self._generatedImageURL + "\n --> TMW.UserVars.generatedImageURL = " + TMW.UserVars.generatedImageURL);

		TMW.Facebook.login (true);
	}

	function posterDetailsSaveErrorSignalHandler (errorResponseText)
	{
		TMW.SessionState.posterDetailsSaveCompleteSignal.remove (posterDetailsSaveCompleteSignalHandler);
		TMW.SessionState.posterDetailsSaveErrorSignal.remove (posterDetailsSaveErrorSignalHandler);


		 self.showPopup ("Something's gone wrong, please try again :(");

		log ("PosterBuilder:: [postToFacebookButtonClickHandler -> posterDetailsSaveErrorSignalHandler] error: " + errorResponseText);
	}
};

TMW.PosterBuilder.prototype.changeImageButtonMouseDownHandler = function (event)
{
	var self = event.data.classScope;

	self._$doneEditingButton.off ();
	self._$changeImageButton.off ();
	self._$imageScaleBarButton.off ();
	self._$posterPlaceholder.off ();
	self._$editPanel.fadeOut ();

	self._scalableImage.clearImage ();
	self._$imageScaleBarContainer.fadeOut ();

	self._$userImageContainer.css ({left: self._currentPosterTransparencyPointVO.centrePosX, top: self._currentPosterTransparencyPointVO.centrePosY});

	function showUploadState ()
	{
		self._$uploadPanel.fadeIn ();

		if (Modernizr.fileinput) self._$uploadPhotoButton.on (self._mouseEventString, {classScope:self}, self.uploadPhotoButtonClickHandler);
		self._$profilePhotoButton.on (self._mouseEventString, {classScope:self}, self.profilePhotoButtonClickHandler);
	}

	setTimeout (showUploadState, 500);
};

TMW.PosterBuilder.prototype.downloadImageButtonClickHandler = function (event)
{
	var self = event.data.classScope;

	log ("PosterBuilder:: [downloadImageButtonClickHandler] self._generatedImageURL: " + self._generatedImageURL);

	window.open (self._generatedImageURL);
	_gaq.push(['_trackEvent', 'Poster Boy', 'Download poster']);
};

TMW.PosterBuilder.prototype.showPopup = function (message)
{
	var self = this;

	self._$popupBackground.fadeIn ().on (self._mouseEventString, {classScope: self}, self.popupBackgroundClickHandler);

	TMW.PosterBoyPage.showPBPopup (message);
}

TMW.PosterBuilder.prototype.hidePopup = function (classScope)
{
	var self = classScope;

	self._$popupBackground.off ().fadeOut ();

	TMW.PosterBoyPage.hidePBPopup ();
}

TMW.PosterBuilder.prototype.popupBackgroundClickHandler = function (event)
{
	var self = event.data.classScope;
	TMW.PosterBuilder.prototype.hidePopup (self);
}

// ------------------------------------------------------------------------------------------ //
// --    SCALE BAR LOGIC
// ------------------------------------------------------------------------------------------ //
TMW.PosterBuilder.prototype.imageScaleBarButtonMouseDownHandler = function (event)
{
	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;

	console.log ("[imageScaleBarMouseDownHandler]");

	if (self._touchSupported)
	{
        console.log ("[imageScaleBarMouseDownHandler] touch is supported.");

		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

		self._previousScaleBarPosX = touch.pageX;

		self._$document.on ("touchmove", {classScope:self}, self.imageScaleBarButtonMouseMoveHandler);
		self._$document.on ("touchend", {classScope:self}, self.imageScaleBarButtonTouchEndHandler);
		self._$document.on ("touchcancel", {classScope:self}, self.imageScaleBarButtonTouchEndHandler);
	}
	else
	{
        console.log ("[imageScaleBarMouseDownHandler] touch is not supported.");

		self._previousScaleBarPosX = event.clientX;

		self._$document.on ("mousemove", {classScope:self}, self.imageScaleBarButtonMouseMoveHandler);
		self._$document.on ("mouseup", {classScope:self}, self.imageScaleBarButtonMouseUpHandler);
	}

	return false;
};

TMW.PosterBuilder.prototype.imageScaleBarButtonMouseMoveHandler = function (event)
{
	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;
	var currentScaleBarPosX;
	var scaleBarPosXDifference;
	var scaleBarPosX;
	var imagePosX;
	var imagePosY;

	if (self._touchSupported)
	{
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		currentScaleBarPosX = touch.pageX;
	}
	else
	{
		currentScaleBarPosX = event.clientX;
	}

	scaleBarPosXDifference = Math.abs (currentScaleBarPosX - self._previousScaleBarPosX);

	if (currentScaleBarPosX > self._previousScaleBarPosX)
	{
		scaleBarPosX = self._$imageScaleBarButton.position ().left + scaleBarPosXDifference;
	}
	else
	{
		scaleBarPosX = self._$imageScaleBarButton.position ().left - scaleBarPosXDifference;
	}

	self._previousScaleBarPosX = currentScaleBarPosX;

	//_scalableImage.currentScalePercent = 100 - (Math.round ((self._$imageScaleBarButton.position ().left / _maxScaleBarPosX) * 100));
	self._scalableImage.currentScalePercent = Math.round ((self._$imageScaleBarButton.position ().left / self._maxScaleBarPosX) * 100);

	self._scalableImage.currentWidth = Math.round (self._scalableImage.maxWidth / 100 * self._scalableImage.currentScalePercent);
	self._scalableImage.currentHeight = Math.round (self._scalableImage.maxHeight / 100 * self._scalableImage.currentScalePercent);

	if (scaleBarPosX > self._maxScaleBarPosX)
	{
		scaleBarPosX = self._maxScaleBarPosX;
		self._scalableImage.currentScalePercent = 100;
		self._scalableImage.currentWidth = self._scalableImage.maxWidth;
		self._scalableImage.currentHeight = self._scalableImage.maxHeight;
	}
	else if (scaleBarPosX < 0)
	{
		scaleBarPosX = 0;
		self._scalableImage.currentScalePercent = 0;
		self._scalableImage.currentWidth = 0;
		self._scalableImage.currentHeight = 0;
	}

	// log ("[imageScaleBarButtonMouseMoveHandler] imageWidth:" + self._scalableImage.currentWidth + " imageHeight:" + self._scalableImage.currentHeight);

	self._$imageScaleBarButton.css ({left:scaleBarPosX});
	self._scalableImage.$image.css ({left:-(self._scalableImage.currentWidth * .5), top:-(self._scalableImage.currentHeight * .5), width:self._scalableImage.currentWidth, height:self._scalableImage.currentHeight});

	var userImagePosX = self._$userImageContainer.position ().left - (self._scalableImage.currentWidth * .5);
	var userImagePosY = self._$userImageContainer.position ().top - (self._scalableImage.currentHeight * .5);

	if (userImagePosX > self._currentPosterTransparencyPointVO.maxPosX - self.POSTER_TRANSPARENCY_POINT_PADDING)
	{
		userImagePosX = self._currentPosterTransparencyPointVO.maxPosX - self.POSTER_TRANSPARENCY_POINT_PADDING + (self._scalableImage.currentWidth * .5);
		self._$userImageContainer.css ({left:userImagePosX});
	}
	else if (userImagePosX < self._currentPosterTransparencyPointVO.minPosX + self.POSTER_TRANSPARENCY_POINT_PADDING - self._scalableImage.currentWidth)
	{
		userImagePosX = self._currentPosterTransparencyPointVO.minPosX + self.POSTER_TRANSPARENCY_POINT_PADDING - (self._scalableImage.currentWidth * .5);
		self._$userImageContainer.css ({left:userImagePosX});
	}

	if (userImagePosY > self._currentPosterTransparencyPointVO.maxPosY - self.POSTER_TRANSPARENCY_POINT_PADDING)
	{
		userImagePosY = self._currentPosterTransparencyPointVO.maxPosY - self.POSTER_TRANSPARENCY_POINT_PADDING + (self._scalableImage.currentHeight * .5);
		self._$userImageContainer.css ({top:userImagePosY});
	}
	else if (userImagePosY < self._currentPosterTransparencyPointVO.minPosY + self.POSTER_TRANSPARENCY_POINT_PADDING - self._scalableImage.currentHeight)
	{
		userImagePosY = self._currentPosterTransparencyPointVO.minPosY + self.POSTER_TRANSPARENCY_POINT_PADDING - (self._scalableImage.currentHeight * .5);
		self._$userImageContainer.css ({top:userImagePosY});
	}
}

TMW.PosterBuilder.prototype.imageScaleBarButtonMouseUpHandler = function (event)
{
	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;

	self._$document.off ({mousemove:self.imageScaleBarButtonMouseMoveHandler, mouseup:self.imageScaleBarButtonMouseUpHandler});

	console.log ("[imageScaleBarButtonMouseUpHandler]");
}

TMW.PosterBuilder.prototype.imageScaleBarButtonTouchEndHandler = function (event)
{
    console.log ("[imageScaleBarButtonTouchEndHandler]");

	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;

	self._$document.off ("touchmove", self.imageScaleBarButtonMouseMoveHandler);
	self._$document.off ("touchend", self.imageScaleBarButtonTouchEndHandler);
	self._$document.off ("touchcancel", self.imageScaleBarButtonTouchEndHandler);
}




// ------------------------------------------------------------------------------------------ //
// --    MOVEMENT LOGIC
// ------------------------------------------------------------------------------------------ //
TMW.PosterBuilder.prototype.posterPlaceholderMouseDownHandler = function (event)
{
	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;

	//currentUserImageHalfWidth = self._scalableImage.currentWidth * .5;
	//currentUserImageHalfHeight = self._scalableImage.currentHeight * .5;

	// log ("[posterPlaceholderMouseDownHandler");

	if (self._touchSupported)
	{
        log ("[posterPlaceholderMouseDownHandler] touch is supported.");

		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

		self._previousUserImageMousePosX = touch.pageX;
		self._previousUserImageMousePosY = touch.pageY;

		self._$document.on ("touchmove", {classScope:self}, self.posterPlaceholderMouseMoveHandler);
		self._$document.on ("touchend", {classScope:self}, self.posterPlaceholderTouchEndHandler);
		self._$document.on ("touchcancel", {classScope:self}, self.posterPlaceholderTouchEndHandler);
	}
	else
	{
        log ("[posterPlaceholderMouseDownHandler] touch is not supported.");

		self._previousUserImageMousePosX = event.clientX;
		self._previousUserImageMousePosY = event.clientY;

		self._$document.on ("mousemove", {classScope:self}, self.posterPlaceholderMouseMoveHandler);
		self._$document.on ("mouseup", {classScope:self}, self.posterPlaceholderMouseUpHandler);
	}

	return false;
}


TMW.PosterBuilder.prototype.posterPlaceholderMouseMoveHandler = function (event)
{
	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;
	var currentUserImageMousePosX;
	var currentUserImageMousePosY;
	var imagePosXDifference;
	var imagePosYDifference;
	var imagePosX;
	var imagePosY;

	if (self._touchSupported)
	{
		var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
		currentUserImageMousePosX = touch.pageX;
		currentUserImageMousePosY = touch.pageY;
	}
	else
	{
		currentUserImageMousePosX = event.clientX;
		currentUserImageMousePosY = event.clientY;
	}

	imagePosXDifference = Math.abs (currentUserImageMousePosX - self._previousUserImageMousePosX);
	imagePosYDifference = Math.abs (currentUserImageMousePosY - self._previousUserImageMousePosY);



	var leftPos = self._$userImageContainer.position ().left;

	// set imagePosX to check later
	if (currentUserImageMousePosX > self._previousUserImageMousePosX)
	{
		imagePosX = self._$userImageContainer.position ().left + imagePosXDifference;
	}
	else
	{
		imagePosX = self._$userImageContainer.position ().left - imagePosXDifference;
	}

	// set imagePosY to check later
	if (currentUserImageMousePosY > self._previousUserImageMousePosY)
	{
		imagePosY = self._$userImageContainer.position ().top + imagePosYDifference;
	}
	else
	{
		imagePosY = self._$userImageContainer.position ().top - imagePosYDifference;
	}

	self._previousUserImageMousePosX = currentUserImageMousePosX;
	self._previousUserImageMousePosY = currentUserImageMousePosY;


	if (imagePosX > self._currentPosterTransparencyPointVO.maxPosX - self.POSTER_TRANSPARENCY_POINT_PADDING + (self._scalableImage.currentWidth * .5))
	{
		imagePosX = self._currentPosterTransparencyPointVO.maxPosX - self.POSTER_TRANSPARENCY_POINT_PADDING + (self._scalableImage.currentWidth * .5);
	}
	else if (imagePosX < self._currentPosterTransparencyPointVO.minPosX + self.POSTER_TRANSPARENCY_POINT_PADDING - (self._scalableImage.currentWidth * .5))
	{
		imagePosX = self._currentPosterTransparencyPointVO.minPosX + self.POSTER_TRANSPARENCY_POINT_PADDING - (self._scalableImage.currentWidth * .5);
	}

	// limit imagePosY
	if (imagePosY > self._currentPosterTransparencyPointVO.maxPosY - self.POSTER_TRANSPARENCY_POINT_PADDING + (self._scalableImage.currentHeight * .5))
	{
		imagePosY = self._currentPosterTransparencyPointVO.maxPosY - self.POSTER_TRANSPARENCY_POINT_PADDING + (self._scalableImage.currentHeight * .5);
	}
	else if (imagePosY < self._currentPosterTransparencyPointVO.minPosY + self.POSTER_TRANSPARENCY_POINT_PADDING - (self._scalableImage.currentHeight * .5))
	{
		imagePosY = self._currentPosterTransparencyPointVO.minPosY + self.POSTER_TRANSPARENCY_POINT_PADDING - (self._scalableImage.currentHeight * .5);
	}


	self._$userImageContainer.css ({left:imagePosX, top:imagePosY});
}

TMW.PosterBuilder.prototype.posterPlaceholderMouseUpHandler = function (event)
{
    console.log ("[posterPlaceholderMouseUpHandler]");

	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;

	self._$document.off ({mousemove:self.posterPlaceholderMouseMoveHandler, mouseup:self.posterPlaceholderMouseUpHandler});
}

TMW.PosterBuilder.prototype.posterPlaceholderTouchEndHandler = function (event)
{
    console.log ("[posterPlaceholderTouchEndHandler]");

	event.preventDefault ? event.preventDefault () : event.returnValue = false;
    event.stopPropagation ? event.stopPropagation () : event.cancelBubble = true;

	var self = event.data.classScope;

    self._$document.off ("touchmove", self.posterPlaceholderMouseMoveHandler);
    self._$document.off ("touchend", self.posterPlaceholderTouchEndHandler);
    self._$document.off ("touchcancel", self.posterPlaceholderTouchEndHandler);
}

// ------------------------------------------------------------------------------------------ //
// --    STATES
// ------------------------------------------------------------------------------------------ //

TMW.PosterBuilder.prototype.showEditState = function (classScope)
	{
		log ("PosterBuilder:: [showEditState]");

		var self = classScope;

		self._$imageScaleBarButton.css ("left", (self._maxScaleBarPosX - self._$imageScaleBarButton.width ()) * .5);

		self._$editPanel.fadeIn ();
		self._$imageScaleBarContainer.fadeIn ();

		self._$imageScaleBarButton.on (self._mouseEventString, {classScope:self}, self.imageScaleBarButtonMouseDownHandler);
		self._$posterPlaceholder.on (self._mouseEventString, {classScope:self}, self.posterPlaceholderMouseDownHandler);
		self._$doneEditingButton.on (self._mouseEventString, {classScope:self}, self.doneEditingButtonMouseDownHandler);
		self._$changeImageButton.on (self._mouseEventString, {classScope:self}, self.changeImageButtonMouseDownHandler);
	}


TMW.PosterBuilder.prototype.showShareState = function (classScope)
{
	var self = classScope;

	self._$sharePanel.fadeIn ();
	self._$postToFacebookButton.on (self._mouseEventString, {classScope:self}, self.postToFacebookButtonClickHandler);
	self._$downloadImageButton.on (self._mouseEventString, {classScope:self}, self.downloadImageButtonClickHandler);

	// FIXME: Default text needs to be changed
	self._$tweetButton.attr ("href", "twitter/tweet?text=Vote%20for%20me&imageurl=" + self._generatedImageURL).attr ("target", "_blank");
}
