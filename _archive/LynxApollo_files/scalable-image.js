function ScalableImage ()
{
    this.SERVER_IMAGE_SCALE_RATIO_DESKTOP = 28;
    this.SERVER_IMAGE_SCALE_RATIO_MOBILE = 20;

    this.$image = $(new Image ());
    this.currentScalePercent;
    this.scaleRatioPercentage;
    this.currentWidth;
    this.currentHeight;
    this.maxWidth;
    this.maxHeight;
    this.parentClassScope;
    this.isMobile;
    this.scalableImageLoadCompleteSignal;

    this._$imageContainer;

    this._initialWidth;
    this._initialHeight;
}

ScalableImage.constructor = ScalableImage;

ScalableImage.prototype.init = function ($imageContainer)
{
    var self = this;
    
    self._$imageContainer = $imageContainer;
    self.scalableImageLoadCompleteSignal = new signals.Signal ();
    self.scaleRatioPercentage = self.isMobile ? self.SERVER_IMAGE_SCALE_RATIO_MOBILE : self.SERVER_IMAGE_SCALE_RATIO_DESKTOP;
}

ScalableImage.prototype.loadImage = function (imageURL, initialWidth, initialHeight)
{
    var self = this;
    
    function setup (event)
    {
        log ("ScalableImage:: [setup] image loaded.");

        log ("original... w:" + this.width + " h:" + this.height);

        self.maxWidth = self.getIntDecreasedByPercentage (this.width, self.scaleRatioPercentage);
        self.maxHeight = self.getIntDecreasedByPercentage (this.height, self.scaleRatioPercentage);
        self.currentWidth = self._initialWidth ? self._initialWidth : self.maxWidth * .5;
        self.currentHeight = self._initialHeight ? self._initialHeight : self.maxHeight * .5;

        log ("scaled... w:" + self.currentWidth + " h:" + self.currentHeight);

        self.$image.css ({left:-(self.currentWidth * .5), top:-(self.currentHeight * .5), width:self.currentWidth, height:self.currentHeight});
        self._$imageContainer.append (self.$image);

        self.scalableImageLoadCompleteSignal.dispatch (self.parentClassScope);
    }

    self._initialWidth = initialWidth;
    self._initialHeight = initialHeight;
    
    self.$image = $(new Image ());
    self.$image.addClass ("user-image").load (setup).attr ("src", imageURL);
}

ScalableImage.prototype.getIntDecreasedByPercentage = function (originalValue, percentageToDecrease)
{
    return Math.round (originalValue / 100 * percentageToDecrease);
}

ScalableImage.prototype.getIntIncreasedByPercentage = function (originalValue, percentageToIncrease)
{
    return Math.round (originalValue / percentageToIncrease * 100);
}

ScalableImage.prototype.clearImage = function ()
{
    var self = this;

    log ("ScalableImage:: [clearImage]");
    
    self._$imageContainer.html ("");
    self.$image = null;
}
