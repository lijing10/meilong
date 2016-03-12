var setInt;
var slidenum = $('.slide>li').length;
$('.slide>li:eq(0)').addClass('active');
$('.slidepoint_center>ul>li:eq(0)').addClass('active');
function slide() {
	for(var i=0; i<slidenum; i++) {
		if($('.slide > li:eq('+i+')').hasClass('active')) {
			if(i == (slidenum - 1)) {
				$('.slidepoint_center>ul>li').removeClass('active');
				$('.slidepoint_center>ul>li:eq(0)').addClass('active');
				$('.slide>li:eq(0)').addClass('active');
				$('.slide>li:eq('+(slidenum - 1)+')').stop(true,true).fadeOut(1200, function() {
					$('.slide>li:eq('+(slidenum - 1)+')').removeClass('active');
					$('.slide>li:eq('+(slidenum - 1)+')').css('display','none');
				});
			} else {
				$('.slidepoint_center>ul>li').removeClass('active');
				$('.slidepoint_center>ul>li:eq('+(i+1)+')').addClass('active');
				$('.slide > .active').next('li').stop(true,true).fadeIn(1200, function() {
					$('.slide>li:eq('+i+')').removeClass('active');
					$('.slide>li:eq('+i+')').css('display','none');
					$('.slide>li:eq('+(i+1)+')').addClass('active');
				});
			}
			break;
		}
	}
}
$('.banner').mouseenter(function() {
	clearInterval(setInt);
}).mouseleave(function() {
	clearInterval(setInt);
	setInt = setInterval(function() {
		slide();
	}, 5000);
});

$('.slideprev,.slidenext').mouseover(function() {
	clearInterval(setInt);
}).mouseout(function() {
	clearInterval(setInt);
	setInt = setInterval(function() {
		slide();
	}, 5000);
});

/* click point to check slide */
$('.slidepoint_center>ul>li>a').click(function() {
	clearInterval(setInt);
	for(var k=0; k<slidenum; k++) {
		if($('.slidepoint_center>ul>li:eq('+k+')').hasClass('active')) {
			$('.slidepoint_center>ul>li').removeClass('active');
			$(this).parent('li:eq(0)').addClass('active');
			for(var j=0; j<slidenum; j++) {
				if($('.slidepoint_center>ul>li:eq('+j+')').hasClass('active')) {
					if(k > j) {
						$('.slide>li:eq('+j+')').addClass('active');
						$('.slide>li:eq('+k+')').stop(true).fadeOut(1000, function() {
							$('.slide>li:eq('+k+')').removeClass('active');
							$('.slide>li:eq('+k+')').css('display','none');
						});
					} else if(k < j) {
						$('.slide>li:eq('+j+')').stop(true).fadeIn(1000, function() {
							$('.slide>li:eq('+k+')').removeClass('active');
							$('.slide>li:eq('+k+')').css('display','none');
							$('.slide>li:eq('+j+')').addClass('active');
						});
					}
					break;
				}
			}
			break;
		}
	}
});

/* click prev */
$('.slideprev').click(function() {
	if($('.slidenext').hasClass('checknext') && $('.slideprev').hasClass('checkprev')) {
		$('.slidenext').removeClass('checknext');
		$('.slideprev').removeClass('checkprev');
		clearInterval(setInt);
		for(var k=0; k<slidenum; k++) {
			if($('.slidepoint_center>ul>li:eq('+k+')').hasClass('active')) {
				$('.slidepoint_center>ul>li').removeClass('active');
				if(k == 0) {
					$('.slidepoint_center>ul>li:eq('+(slidenum-1)+')').addClass('active');
					$('.slide>li:eq('+(slidenum-1)+')').stop(true).fadeIn(1000, function() {
						$('.slide>li:eq('+k+')').removeClass('active');
						$('.slide>li:eq('+k+')').css('display','none');
						$('.slide>li:eq('+(slidenum-1)+')').addClass('active');
						$('.slidenext').addClass('checknext');
						$('.slideprev').addClass('checkprev');
					});
				} else {
					$('.slidepoint_center>ul>li:eq('+(k-1)+')').addClass('active');
					$('.slide>li:eq('+(k-1)+')').addClass('active');
					$('.slide>li:eq('+k+')').stop(true).fadeOut(1000, function() {
						$('.slide>li:eq('+k+')').removeClass('active');
						$('.slide>li:eq('+k+')').css('display','none');
						$('.slidenext').addClass('checknext');
						$('.slideprev').addClass('checkprev');
					});
				}
				break;
			}
		}
		
	}
});
/* click next */
$('.slidenext').click(function() {
	if($('.slidenext').hasClass('checknext') && $('.slideprev').hasClass('checkprev')) {
		$('.slidenext').removeClass('checknext');
		$('.slideprev').removeClass('checkprev');
		clearInterval(setInt);
		for(var k=0; k<slidenum; k++) {
			if($('.slidepoint_center>ul>li:eq('+k+')').hasClass('active')) {
				$('.slidepoint_center>ul>li').removeClass('active');
				if(k == (slidenum-1)) {
					$('.slide>li:eq(0)').addClass('active');
					$('.slidepoint_center>ul>li:eq(0)').addClass('active');
					$('.slide>li:eq('+k+')').stop(true).fadeOut(1000, function() {
						$('.slide>li:eq('+k+')').removeClass('active');
						$('.slide>li:eq('+k+')').css('display','none');
						$('.slidenext').addClass('checknext');
						$('.slideprev').addClass('checkprev');
					});
				} else {
					$('.slidepoint_center>ul>li:eq('+(k+1)+')').addClass('active');
					$('.slide>li:eq('+(k+1)+')').stop(true).fadeIn(1000, function() {
						$('.slide>li:eq('+k+')').removeClass('active');
						$('.slide>li:eq('+k+')').css('display','none');
						$('.slide>li:eq('+(k+1)+')').addClass('active');
						$('.slidenext').addClass('checknext');
						$('.slideprev').addClass('checkprev');
					});
				}
				break;
			}
		}
		
	}
});
$('.slideprev').addClass('checkprev');
$('.slidenext').addClass('checknext');
setInt = setInterval(function() {
	slide();
}, 5000);
$(".banner").hover(function(){
    $(".banner .slideprev").stop(true,true).animate({left:"0"},300);
    $(".banner .slidenext").stop(true,true).animate({right:"0"},300);
 },function(){
    $(".banner .slideprev").animate({left:"-50px"},300);
    $(".banner .slidenext").animate({right:"-50px"},300);
 })