/// <reference path='./require.js' />
/// <reference path='./jquery-1.11.2.min.js' />
/// <reference path='./TweenMax.min.js' />

(function main( domain, undefined ) { "use strict";


var Tracker = function Tracker() {
    this.$elements = [];
    this.$domain   = $(window);
    this.$domain.on("scroll resize orientationchange", jQuery.proxy(this._TrackHandler, this));
}


Tracker.prototype.IsContains = function IsContains( $target ) {
    var o = $target.offset().top;
    var t = $target.outerHeight();
    var f = this.$domain.scrollTop();
    var h = this.$domain.height();
    return ( ((o >= f) && (o <= f + h)) || ((o + t >= f) && (o + t <= f + h)) )
        || ( ((f >= o) && (f <= o + t)) || ((f + h >= o) && (f + h <= o + t)) );
}


Tracker.prototype._TrackHandler = function _TrackHandler( evt ) {
    var $item = null;
    var onscreen = false;
    for ( var i = 0; i < this.$elements.length; ++i ) {
        $item = this.$elements[i];
        onscreen = this.IsContains( $item );
        
        if ( !($item.hasClass("on-screen")) ) {
            
            if ( (onscreen) ) {
                $item.addClass("on-screen");
                $item.trigger("enterscreen.track");
            }
        }
        else {
            if ( !$item.hasClass("off-screen-disabled") && !(onscreen) ) {
                $item.removeClass("on-screen");
                $item.trigger("leavescreen.track");
            }
        }
    }
}


Tracker.prototype.Add = function Add( $target ) {
    this.$elements.push( $($target).first() );
}


Tracker.prototype.RendenNow = function RendenNow() {
    this._TrackHandler(null);
}



domain.Tracker = Tracker;
}(this));