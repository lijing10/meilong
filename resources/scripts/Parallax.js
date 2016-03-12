/// <reference path='./require.js' />
/// <reference path='./jquery-1.11.2.min.js' />
/// <reference path='./TweenMax.min.js' />

(function main( domain, undefined ) { "use strict";


var Parallax = function Parallax( selector, options ) {
    this.options = (options || {});
    this.size = (this.options.size || 0);
    this.$selector = $(selector);
    this.$domain   = $(window);
    this.$domain.on("scroll resize orientationchange", jQuery.proxy(this._TrackHandler, this));
    this._TrackHandler();
}


Parallax.prototype._TrackHandler = function _TrackHandler( evt ) {
    var top = this.$selector.offset().top;
    var stop = this.$domain.scrollTop();

    var height = this.$selector.height();
    var sHeight = this.$domain.height();

    var dist = ( (stop + sHeight * 0.5) - (top + height * 0.5) );
    var factor = ( dist / (height) );
        factor = Math.max(-1, Math.min(1, factor));
    var bps = "0px " + (-this.size + Math.round(-factor * this.size)) + "px";

    TweenMax.to(this.$selector, 0.2, { backgroundPosition: bps, ease: Linear.easeNone });
    //this.$selector.css("background-position", bps);
}


domain.Parallax = Parallax;
}(this));