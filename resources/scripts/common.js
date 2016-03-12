//导航切换
 $(function(){
     $(".header .nav>li").hover(function(){
         $(this).find(".nav_ul").stop(true,true).animate({height:'show',opacity:'show'},500);
         $(this).css('backgroundColor','#323232').find('.nav-button').css('color','#f65314');
     },
     function(){
         $(this).find(".nav_ul").hide();
         $(this).css('backgroundColor','').find('.nav-button').css('color','');
     });
 })

 //二维码延迟显示
var timer = null;
$('.header .tools .wel>.last').mouseover(function(){
    clearInterval(timer);
    setTimeout(function(){
        $('.header .tools .wel>.last').next().show();
    },300);
});
$('.header .tools .wel>img').mouseover(function(){
    clearInterval(timer);
    setTimeout(function(){
        $('.header .tools .wel>.last').next().show();
    },300);
});
$('.header .tools .wel>.last').mouseout(function(){
    clearInterval(timer);
    timer = setTimeout(function(){
            $('.header .tools .wel>.last').next().hide();
        },300);
});
$('.header .tools .wel>img').mouseout(function(){
     clearInterval(timer);
    timer = setTimeout(function(){
            $('.header .tools .wel>.last').next().hide();
        },300);
})

/* 返回顶部按钮 */
var $fixedCollection = $(".fixed-collection");
var $scrollToTop = $(".scrolltotop");
$(window).scroll(function( evt ) {
    if ( $(window).scrollTop() >= 200 ) {
        $fixedCollection.css("display", "block");
    }
    else {
        $fixedCollection.css("display", "none");
    }
});
$scrollToTop.click(function( evt ) {
    TweenMax.to(window, 0.6, { scrollTo: { y: 0 }, ease: Quad.easeInOut });
});

/*美隆品牌banner*/
// var bannerWidth = $('.banner_list').length;
// var bannerLeft = $('.banner_list').width()*(bannerWidth-1);
// $('.banner_wrap .banner').css("width",bannerWidth+'00%');
// $('.prev_button').click(function(){
//     // alert($('.banner').position().left);
//     if($('.banner').position().left<=-bannerLeft){
//         // $('.banner').css("left","0");
//     }
//     else{
//         if(!$('.banner').is(':animated')){
//             $('.banner').animate({
//                 left:"-=100%"
//             },1000);
//         }
//     }
// });
// $('.banner_wrap .next_button').click(function(){
//     // alert($('.banner').position().left);
//     if($('.banner').position().left>=0){
//         // $('.banner').css("left","-1080px");
//     }
//     else{
//         if(!$('.banner').is(':animated')){
//             $('.banner').animate({
//                 left:"+=100%"
//             },1000);
//         }
//     }
// });
(function(){
    var i = 0;
    var a;
    $('.banner_list:not(:first)').css("display",'none');
    $('.prev_button').click(function(){
        a = true
        showImg();
    })
    $('.next_button').click(function(){
        a = false;
        showImg();
    })
    $('.prev_button').hover(function(){
        clearInterval(brand_timer);
    },function(){
        brand_timer = setInterval(function(){
            a = true;
            showImg();
        },5000);
    })
    $('.next_button').hover(function(){
        clearInterval(brand_timer);
    },function(){
        brand_timer = setInterval(function(){
            a = true;
            showImg();
        },5000);
    })
    $('.banner_content').hover(function(){
        clearInterval(brand_timer);
    },function(){
        brand_timer = setInterval(function(){
            a = true;
            showImg();
        },5000);
    })
    var brand_timer = setInterval(function(){
        a = true;
        showImg();
    },5000);
    function showImg(){
        var num = $('.banner_list').length;
        if(!$('.banner_list').is(':animated')){
            $('.banner_list:visible').stop(true,true).fadeOut(1200);
            if(a){
                if(i>=num-1){
                    $('.banner_list').eq(0).stop(true,true).fadeIn(2000);
                    i = 0;
                }else{
                    $('.banner_list').eq(++i).stop(true,true).fadeIn(2000);
                }  
            }else{
                if(i<=0){
                    $('.banner_list').eq(num-1).stop(true,true).fadeIn(2000);
                    i = num-1;
                }else{
                    $('.banner_list').eq(--i).stop(true,true).fadeIn(2000);
                }
            }
        }
    }
})()
