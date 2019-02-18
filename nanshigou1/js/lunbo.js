jQuery($ => {
	for(var i = 0; i < $('#lunbo_img img').length; i++) {
		$("<li/>").appendTo('#lunbo_point').addClass('listyle');
	}
	$('#lunbo_img li').eq(0).css('z-index', 2);
	$('#lunbo_point li').eq(0).addClass('light');

	var idx = 0;
	var timer = setInterval(autoplay, 2000);

	function autoplay() {
		idx = ++idx >= $('#lunbo_img img').length ? 0 : idx;
		next(idx);
	}

	function next(idx) {
		//		console.log(idx);
		for(var i = 0; i < $('#lunbo_img img').length; i++) {
			$('#lunbo_img li').eq(i).css('z-index', 1);
			$('#lunbo_point li').eq(i).removeClass('light');
		}
		$('#lunbo_img li').eq(idx).css('z-index', 2); //设置优先级
		$('#lunbo_point li').eq(idx).addClass('light');
	}

	$('#lunbo').mouseover(function() {
		clearInterval(timer);
	});

	$('#lunbo').mouseout(function() {
		timer = setInterval(autoplay, 2000);
	});

	$('#lunbo_point li').on('click', function() {
		var i = $(this).index();
		next(i);
		idx = i;
	});

	$('#lunbo p').mouseover(function() {
		$(this).parent().children('p').animate({
			opacity : '0.5'
		}, 500);
	});
	$('#lunbo p').mouseleave(function() {
		$(this).parent().children('p').animate({
			opacity : '0'
		}, 500);
	});

	$('#lbnext').click(function() {
		autoplay();
	});

	$('#lbprev').click(function() {
		console.log(idx);
		idx = --idx < 0 ? $('#lunbo_img img').length - 1 : idx;
		console.log(idx);
		next(idx);
	});
});