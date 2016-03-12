/// <reference path='./require.js' />
/// <reference path='./jquery-1.11.2.min.js' />
/// <reference path='./TweenMax.min.js' />

(function main( domain, undefined ) { "use strict";



var Picker = function Picker( selector ) {
    this.$selector = $(selector);
    this.$trigger = this.$selector.find(".pik-button");
    this.$wrapper = this.$selector.children(".picker-wrapper");
    this.$listser = this.$selector.find(".picker-list");
    this._isOpened = false;


    this._dCloseHandler = jQuery.proxy(this._CloseHandler, this);
    this.$trigger.on("click", jQuery.proxy(this._TriggerHandler, this));
}



Picker.prototype._TriggerHandler = function _TriggerHandler( evt ) {
    if ( !(this._isOpened) ) {
        this._OpenHandler( evt );
        return;
    }
    else {
        var $active = this.$trigger.filter(".actived");

        if ( !($active[0] === evt.currentTarget) ) {
            $active.removeClass("actived");
            $active = $(evt.currentTarget);
            $active.addClass("actived");
            this.$selector.trigger("change.picker");
        }

        this._CloseHandler(evt);
        return;
    }
}


Picker.prototype._OpenHandler = function _OpenHandler( evt ) {
    evt.stopPropagation();
    this._isOpened = true;
    this.$selector.addClass("picker-opened");
    $(document).on("click", this._dCloseHandler);

    var $active = this.$trigger.filter(".actived");
    if ( !($active.length) ) { $active = this.$trigger.first(); }
    var top = $active.offset().top - this.$listser.offset().top;


    TweenMax.to(this.$wrapper, 0.2, { height: this.$listser.height(), top: -top, ease: Quad.easeInOut });
    TweenMax.to(this.$listser, 0.2, { marginTop: 0, ease: Quad.easeInOut });
}


Picker.prototype._CloseHandler = function _CloseHandler( evt ) {
    evt.stopPropagation();
    this._isOpened = false;
    this.$selector.removeClass("picker-opened");
    $(document).off("click", this._dCloseHandler);
    
    var $active = this.$trigger.filter(".actived");
    if ( !($active.length) ) { $active = this.$trigger.first(); }
    var top = $active.offset().top - this.$listser.offset().top;
    
    TweenMax.to(this.$wrapper, 0.2, { height: this.$selector.height(), top: 0, ease: Quad.easeInOut });
    TweenMax.to(this.$listser, 0.2, { marginTop: -top, ease: Quad.easeInOut });
}

Picker.prototype.GetValue = function GetValue() {
    var $active = this.$trigger.filter(".actived");
    if ( !($active.length) ) { $active = this.$trigger.first(); }
    return $active.data("value");
}






domain.Picker = Picker;
}(this));