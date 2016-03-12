/// =========================================================================
/*< 工具函数 >*/
/// =========================================================================
var __TESTDOM__ = document.createElement("div");
var __VENDORS__ = [ "webkit", "moz", "ms", "o", "khtml" ];
var __SP_2D_TRANSFORM__ = null;
var __SP_3D_TRANSFORM__ = null;


var TestCssStyle = function TestCssStyle( name ) {
    /// <summary>
    /// 测试浏览器是否支持特定的 css 属性；
    /// </summary>
    /// <param name='name' type='String'>
    /// 必须，提供要测试的 css 属性的名称；
    /// </param>
    /// <returns type='Boolean'>
    /// 如果浏览器支持该 css 属性，则返回 true；
    /// 否则返回 false；
    /// </returns>
    if ( (name in __TESTDOM__.style) )
        return true;

    var suffix = name.charAt(0).toUpperCase() + name.slice(1);
    for ( var i = 0, n = null; i < __VENDORS__.length; ++i ) {

        n = (__VENDORS__[i] + suffix);
        if ( (n in __TESTDOM__.style) ) { return true; }
    }

    return false;
}


var Test2DTransform = function Test2DTransform() {
    /// <summary>
    /// 判断浏览器是否支持 transform2d 属性；
    /// </summary>
    /// <returns type='Boolean'>
    /// 如果浏览器支持 2d 变换，则返回 true;
    /// 否则返回 false；
    /// </returns>

    return (__SP_2D_TRANSFORM__ === null ? (__SP_2D_TRANSFORM__ = TestCssStyle("transform")) : __SP_2D_TRANSFORM__);
}



var Test3DTransform = function Test3DTransform() {
    /// <summary>
    /// 判断浏览器是否支持 transform3d 属性；
    /// </summary>
    /// <returns type='Boolean'>
    /// 如果浏览器支持 3d 变换，则返回 true;
    /// 否则返回 false；
    /// </returns>

    if ( (__SP_3D_TRANSFORM__ !== null) ) {
        return __SP_3D_TRANSFORM__;
    }

    /// 无法获取动态样式；
    if ( !(typeof $domain.getComputedStyle == "function") )
        return false;

    /// 当 document 还没有触发 interactive 事件时， document.body 不可用；
    if ( !(document.body) )
        return false;

    /// 浏览器不支持 W3C: transform 属性样式；
    if ( !("transform" in document.body.style) )
        return false;

    /// 利用 [style + getComputedStyle] 判断 DOM 对象是否应用了 matrix3d() 属性样式； 
    var t = null;
    var e = document.createElement("div");
        e.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
        document.body.insertBefore(e, document.body.firstChild);
        t = $domain.getComputedStyle(e).getPropertyValue("transform");
        document.body.removeChild(e);

    return ( __SP_3D_TRANSFORM__ = ((typeof e != "undefined") && (e !== null) && (e !== "none") && (e !== "")) );
}