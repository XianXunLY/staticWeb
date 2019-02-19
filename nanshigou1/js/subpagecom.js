$(function (){
	var keyarr = ['', '上装', '鞋靴', '美妆', '套装', 'T恤', '防晒衣', 'POLO衫', '休闲鞋', '下装'];
	var toatlprice = 0; //存放总价格
	//点击切换登录注册页面

	//工具栏########################################################

	//	//1.点击导航分类时重新加载search页面  detalis.html search.html
	$('#nav .nav li').click(function () {
		if (keyarr[$(this).index()]) {
			location.href = 'search.html?' + 'searchkey=' + keyarr[$(this).index()];
		} else {
			location.href = '../1.html';
		}
	});

	//2.购物车增加删除操作  detalis.html search.html
	if (cookie.get('username')) {
		shopcar();
	}

	//3. 点击购物车li的 a 类名.toolgoodsdelete删除商品li  detalis.html  search.html
	$('#carcontent').on('click', '.toolgoodsdelete', function () {
		$(this).closest('li').remove();
		//更新orders订单数据
		var username = cookie.get('username');
		var goodId = $(this).closest('li').attr('id');
		var deleteprice = $(this).prev().children('span').text().slice(1) * 1;
		var deletenum = $(this).prev().children('i').text() * 1;
		//		console.log($(this).prev().children('span'),deleteprice,deletenum);
		$.ajax({
			type: "POST",
			url: "../api/query.php",
			data: "action=delete&buyername=" + username + "&goodId=" + goodId,
			success: function (str) {
				//数据处理渲染
				if (str == 'yes') {
					//					console.log('删除成功');
					//更新总价
					var toatlprice = $('#tooltotalprice').text().slice(1) * 1 - deleteprice;
					$('#tooltotalprice').text('¥' + toatlprice);
					if (toatlprice == 0) {
						$('#carcontent .carcontentbottom p').hide();
					} else {
						$('#carcontent .carcontentbottom p').show();
					}
				} else {
					console.log('删除失败');
					location.reload(); //重新加载页面
				}
			},
			error: function (xhr) {
				alert(xhr.responseText);
			}
		});
	});

	//4.//点击热度关键词搜索  detalis.html  search.html
	$('#logo #logo_ul2 li').click(function () {
		location.href = 'search.html?' + 'searchkey=' + $(this).text();
	});

	//logo######################################################################v
	//5.dl我的购物车结算商品按钮
	$('#btn-cart').click(function () {
		if (cookie.get('username')) {
			//登录
			location.href = 'shopcar.html?' + 'username=' + cookie.get('username');
		} else {
			location.href = 'login.html?' + 'loginway=登录';
		}
	});

	//6.用户退出
	$('#loginexit').click(function () {
		console.log('exit');
		cookie.remove('username');
		location.href = '../1.html';
	});

	//7.用户功能按钮都是打开登录界面
	$('#logo .logo_person dl a').click(function () {
		if (cookie.get('username')) {
			//登录
			alert('该功能还未完善，敬请期待');
		} else {
			location.href = 'login.html?' + 'loginway=登录';
		}
	});
});

//购物车所需数据查找函数
function shopcar() {
	var buyername = cookie.get('username');
	$.ajax({
		type: "POST",
		url: "../api/query.php",
		data: "action=shopcar&buyername=" + buyername,
		success: function (str) {
			//数据处理渲染
			$('#carcontent ul').html(shopcarrender(str));
			if (toatlprice == 0) {
				$('#carcontent .carcontentbottom p').hide();
			} else {
				$('#carcontent .carcontentbottom p').show();
			}
		},
		error: function (xhr) {
			alert(xhr.responseText);
		}
	});
}
//购物车数据渲染
function shopcarrender(str) {
	toatlprice = 0;
	var arr = JSON.parse(str);
	if (arr.length != 0) {
		//用户购物车有数据
		var s = arr.map(function (item) {
			toatlprice += item.price * item.num;
			return `<li id="${item.goodId}">
						<img src="../img/${item.img}" />
						<div>
							<a class="toolgoodsname">${item.goodname}</a>
							<p><span>¥${item.price}</span> X <i>${item.num}</i></p>
							<a class="toolgoodsdelete" title="删除">X</a>
						</div>
					</li>`;
		}).join('');
		$('#tooltotalprice').text('¥' + toatlprice);
		return s;
	} else {
		return `<li>
						<p style="text-align:center;margin-top: 10px;">暂无商品</p>
					</li>`;
	}
}