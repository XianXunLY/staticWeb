jQuery($ => {
	//获取link列表的位置，作为条件判断是否吸顶
	var linkultop = $('#goodlinkul').offset().top;
	$(window).scroll(function(e) {
		var currenttop = $(window).scrollTop();
		if(currenttop <= linkultop) {
			$('#goodlinkul').removeClass('ulfixed'); //吸顶
		} else {
			$('#goodlinkul').addClass('ulfixed'); //吸顶
		}
	});

	//商品品牌、评论、销售列表切换
	$('#goodlinkul li').click(function() {
		//切换样式
		$(this).addClass('goodslinkactive').siblings().removeClass('goodslinkactive');
		$(this).parent().addClass('ulfixed'); //吸顶
		if($(this).index() == 0) { //品牌
			//楼层跳跃到品牌介绍
			$('#linkgoodsbrand').show();
			window.scrollTo(0, $('#linkgoodsbrand').offset().top - 41);
		} else if($(this).index() == 1) { //评论
			//楼层跳跃到评论
			window.scrollTo(0, $('#linkgoodsassess').offset().top - 41);
			$('#linkgoodsbrand').hide();
		} else if($(this).index() == 2) { //销售
			//楼层跳跃到销售记录
			window.scrollTo(0, $('#linkgoodsrecord').offset().top - 41);
			$('#linkgoodsbrand').hide();
		} else if($(this).index() == 3) { //咨询
			//楼层跳跃到咨询
			window.scrollTo(0, $('#linkgoodsconsult').offset().top - 41);
			$('#linkgoodsbrand').hide();
		}
	});

	//商品好评，中评 差评列表切换
	$('#assessdetailsul li').click(function() {
		$(this).addClass('assessdetailsactive').siblings().removeClass('assessdetailsactive');
	});

	//商品咨询选项列表切换
	$('#consultdetailsul li').click(function() {
		$(this).addClass('consultdetailsactive').siblings().removeClass('consultdetailsactive');
	});

	$('#assessrightbtn').click(function() {
		//如果是登录状态
		if(cookie.get('username')) {
			//可评价@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
		} else {
			location.href = 'login.html?' + 'loginway=登录';
		}
	});

});