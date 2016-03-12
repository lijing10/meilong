
	function Get_Cookie( check_name ) {
		// first we'll split this cookie up into name/value pairs
		// note: document.cookie only returns name=value, not the other components
		var a_all_cookies = document.cookie.split( ';' );
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false; // set boolean t/f default f

		for ( var i = 0; i < a_all_cookies.length; i++ )
		{
			// now we'll split apart each name=value pair
			a_temp_cookie = a_all_cookies[i].split( '=' );


			// and trim left/right whitespace while we're at it
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

			// if the extracted name matches passed check_name
			if ( cookie_name == check_name )
			{
				b_cookie_found = true;
				// we need to handle case where cookie has no value but exists (no = sign, that is):
				if ( a_temp_cookie.length > 1 )
				{
					cookie_value = ( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
				}
				// note that in cases where cookie is initialized but no value, null is returned
				return cookie_value;
				break;
			}
			a_temp_cookie = null;
			cookie_name = '';
		}
		if ( !b_cookie_found )
		{
			return null;
		}
	}
	function Delete_Cookie( name, path, domain ) {
	    if ( Get_Cookie( name ) ) document.cookie = name + "=" +
	    ( ( path ) ? ";path=" + path : "") +
	    ( ( domain ) ? ";domain=" + domain : "" ) +
	    ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
	//授权水印
	var img_cookie = Get_Cookie("after");
	var mobile = Get_Cookie("mobile");
	var url = 'http://shouquanshu.hongjiu.tv/'+img_cookie+'.jpg';
	$(".auth-data-wrapper>img").attr('src',url);
	$(".auth-message>.codevalue").html(mobile);

	 
	//登陆状态切换
	$(function(){
		var name_cookie = Get_Cookie('name');
		if(name_cookie != null && name_cookie.length > 0){
		    $('.header .tools .wel>.login').css('display','none');
		    $('.header .tools .wel>.info').css('display','inline-block');
		    $('.header .tools .wel>.info a:eq(0)').html(decodeURI(name_cookie));
		}

		$('.exit').click(function(){
		    Delete_Cookie("meilonguser","/","meilong.cn");
		    Delete_Cookie("name","/","meilong.cn");
		    $('.header .tools .wel>.login').css('display','inline-block');
		    $('.header .tools .wel>.info').css('display','none');
		    window.location.href="http://www.meilong.cn/index.html";
		})
	})
