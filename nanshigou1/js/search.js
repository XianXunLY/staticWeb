$(function (){
	var condition = 'id'; //默认查询数据排序为id
	var min = 0;
	var max = 200;
	var qty = 8; //列表页条数
	var page = 1; //当前页数
	var pagemax = 1; //存最大页数
	var desc = false; //默认升序

	//商品排序查询
	function search() {
		var data = decodeURI(location.search); //获取界面的url参数 如：'?searchkey=上装'
		var str = data.slice(11); //剪切得到查询关键词
		//内容标题更新
		$('#searchContent p span')[0].innerHTML = '> ' + str;
		//通过关键词用ajax查询数据并渲染出来.condition控制数据排序
		$.ajax({
			type: "post",
			url: "../api/query.php",
			data: "action=search&assortment=" + str + "&condition=" + condition + "&min=" + min + "&max=" + max + "&qty=" + qty + "&page=" + page + "&desc=" + desc,
			async: true,
			success: function (str) {
				//渲染数据
				$('#searchContent #goodsrender').html(searchrender(str));
				//动态生成pageli
				//				console.log('pagemax=' + pagemax);
				var pagehtml = '<li class="pagefirstli"><span>首页</span></li><li><span>上一页</span></li>';
				//可以优化生成pageli的算法#############################################################################
				for (var i = 1; i <= pagemax; i++) {
					pagehtml += '<li class="pagesli"><span>' + i + '</span></li>';
				}
				pagehtml += '<li><span>下一页</span></li><li class="pagelastli"><span>尾页</span></li>';
				$('#goodspageul').html(pagehtml);
				//pagesli样式改变
				litrans();
			}
		});
	}

	function litrans() {
		if (page == 1) {
			$('#goodspageul li').children().removeClass('clickable');
			$('#goodstoggle').children().removeClass('goodstop');
			$('#goodstoggle').children().eq(0).addClass('goodstop');
			if (page == pagemax) {
				$('#goodspageul li:last').children().removeClass('clickable');
				$('#goodspageul li:last').prev().children().removeClass('clickable');
				$('#goodstoggle').children().eq(1).addClass('goodstop');
			} else {
				$('#goodspageul li:gt(1)').children().addClass('clickable');
			}
		} else if (page == pagemax) {
			$('#goodspageul li').children().addClass('clickable');
			$('#goodspageul li:last').children().removeClass('clickable');
			$('#goodspageul li:last').prev().children().removeClass('clickable');
			$('#goodstoggle').children().removeClass('goodstop');
			$('#goodstoggle').children().eq(1).addClass('goodstop');
		} else {
			$('#goodspageul li').children().addClass('clickable');
			$('#goodstoggle').children().removeClass('goodstop');
		}
		$('#goodspageul li').children().css('background', '#fff');
		$('#goodspageul li').eq(page + 1).children().css('background', '#2f97f0');
	}

	function searchrender(str) {
		//查询页面goods数据渲染函数，返回拼接好的字符串
		var arr = JSON.parse(str);
		pagemax = parseInt(arr.pagemax); //更新最大页数
		var s = arr.datalist.map(function (item) {
			//map方法返回的是个数组，用join方法把它变成可以用来渲染的字符
			return `<li goodid="${item.goodId}" totalnum="${item.goodTotal}">
						<div class="goodscontentimg">
							<img src="../img/${item.img}" />
						</div>
						<div class="borderbox"></div>
						<div class="goodscontenttext">
							<p class="p1"><img src="../img/${item.img}" /></p>
							<p class="p2"><a>${item.goodname}</a></p>
							<p class="p3"><em class="em1">¥${item.shopprice}</em><em class="em2">¥${item.marketprice}</em><span></span></p>
							<p class="p4"><span><input type="checkbox" />加入对比</span></p>
							<p class="p5">
								<span><i>${item.sellnumber}</i>商品销量</span>
								<span><i>${item.assessnumber}</i>用户评论</span>
								<span style="border: none;"></span>
							</p>
							<p class="p6">${item.storename}</p>
							<input type="button" name="" id="addshopcar" value="加入购物车" />
						</div>
					</li>`;
		}).join('');
		return s;
	}
	//推荐商品查询
	function commend() {
		var data = decodeURI(location.search); //获取界面的url参数 如：'?searchkey=上装'
		var str = data.slice(11); //剪切得到查询关键词
		//内容标题更新
		$('#searchContent p span')[0].innerHTML = '> ' + str;
		//通过关键词用ajax查询数据并渲染出来.condition控制数据排序
		$.ajax({
			type: "post",
			url: "../api/query.php",
			data: "action=init&assortment=" + str,
			async: true,
			success: function (str) {
				$('#searchContent #commendsrender').html(commendrender(str));
			}
		});
	}

	function commendrender(str) {
		//查询页面commendgoods数据渲染函数，返回拼接好的字符串
		var arr = JSON.parse(str);
		var s = arr.map(function (item) {
			//map方法返回的是个数组，用join方法把它变成可以用来渲染的字符
			return `<li goodid="${item.goodId}">
						<div class="commendimg">
							<img src="../img/${item.img}" />
						</div>
						<div class="commendinfo">
							<dt><a>${item.goodname}</a</dt>>
							<dd>商城价：<span>¥${item.shopprice}.00</span></dd>
							<a class="qianggou">立即抢购</a>
						</div>
					</li>`;
		}).join('');
		return s;
	}

	//加载页面时初始化
	commend();
	search();

	//推荐商品点击跳转
	$('#commendsrender').on('click', 'a', function () {
		var goodid = $(this).closest('li').attr('goodid');
		location.href = 'detail.html?' + 'goodsId=' + goodid;
	});

	//点击排序方式按钮时重新渲染页面
	$('#searchContent nav .paixu .paixuways').click(function () {
		if ($(this)[0].className == 'paixuways paixuactive') {
			desc = !desc;
		} else {
			desc = false;
			$(this).parent().children('li').removeClass('paixuactive'); //清除样式
			$(this).addClass('paixuactive'); //按钮样式改变
		}
		//重新加载数据，更新查询条件
		condition = $(this).text();
		search();
	});

	//点击输入价格查询
	$('#searchContent nav .paixu #pricerange #rangesearch').click(function () {
		//重新加载数据，更新查询条件
		if ($('#searchContent nav .paixu #max').val().trim()) {
			//有最大范围就可以查询数据
			console.log(condition);
			max = $('#searchContent nav .paixu #max').val().trim(); //更新max的值
			if ($('#searchContent nav .paixu #min').val().trim()) {
				min = $('#searchContent nav .paixu #min').val().trim(); //更新min的值
			}
			search();
		}
	});

	//点击加载上或下的一页数据，改变当前页数值
	$('#searchContent nav .goodstoggle span').eq(0).click(function () {
		if (page > 1) {
			page--;
			search();
		}
	});
	$('#searchContent nav .goodstoggle span').eq(1).click(function () {
		if (page < pagemax) {
			page++;
			search();
		}
	});

	//点击pageli时更新页面和page样式@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	$('#goodspageul').on('click', 'li', function () {
		console.log($(this).index());
		if ($(this).index() == 0) {
			if (page > 1) {
				//如果当前页数大于1的话就可以加载首页内容
				page = 1;
				search();
			}
		} else if ($(this).index() == 1) {
			//确认点击的是上一页按钮
			if (page > 1) {
				//如果当前页数大于1的话就可以加载上一页内容
				page--;
				search();
			}
		} else if ($(this).index() > 1) {
			//点击的不是首页和上一页
			//找到下一页按钮所在的索引
			var pagelilast2 = $(this).parent().children('li:last').prev().index();
			if ($(this).index() == pagelilast2) {
				//点击的是下一页
				//如果页数小于pagemax就可以加载下一页
				if (page < pagemax) {
					page++;
					search();
				}
			} else if ($(this).index() == pagelilast2 + 1) {
				//点击的是尾页
				if (page < pagemax) {
					//如果当前页数小于pagemax的话就可以加载尾页内容
					page = pagemax;
					search();
				}
			} else {
				//点击的是有页码的li
				if ($(this).index() == page + 1) {//点击所在页page,不用改变

				} else {
					page = $(this).children().text() * 1;
					//					console.log(page);
					$(this).children().css('background', '#2f97f0');
					search();
				}
			}
		}
	});

	//点击商品search列表中指定元素，打开不同的详情页
	$('#goodsrender').on('click', '.goodscontentimg', function () {
		//时间委托，处理动态创建的li点击事件
		var goodid = $(this).closest('li').attr('goodid'); //获取父辈li渲染出来时自定义属性id
		location.href = 'detail.html?' + 'goodsId=' + goodid; //传商品goodid跳转页面
	});
	$('#goodsrender').on('click', 'a', function () {
		//时间委托，处理动态创建的li点击事件
		var goodid = $(this).closest('li').attr('goodid');
		location.href = 'detail.html?' + 'goodsId=' + goodid;
	});

	//点击加入购物车按钮	
	$('#goodsrender').on('click', 'input', function () {
		//时间委托，处理动态创建的加入购物车按钮点击事件
		var goodid = $(this).closest('li').attr('goodid') * 1;
		var totalnum = $(this).closest('li').attr('totalnum') * 1;
		//添加订单进orders
		addorders(goodid, 1, totalnum, $(this));
	});

	//当鼠标移进商品列表li中，盒子高度变化
	$('#searchContent .goodscontent li').mouseenter(function () {
		$(this).animate({
			height: "470px"
		}, 200);
	});
	$('#searchContent .goodscontent li').mouseleave(function () {
		$(this)[0].style.cssText = "";
	});
});