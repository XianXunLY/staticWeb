var apiurl = ''; //存接口相对地址
var indexurl = ''; //存主页跳转相对地址
var toatlprice = 0; //存放总价格
$(function (){
	var isshow = false; //侧边工具栏loginbox和userinfbox显示开关
	var isok = true; //侧边工具栏shopcar显示开关
	var htmlurl = ''; //存html跳转相对地址
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  location页面跳转逻辑要修改一下
	if (location.search) {
		console.log('feizhuye');
		apiurl = '../';
		htmlurl = '';
		indexurl = '../';
	} else {
		console.log('zhuye');
		apiurl = '';
		htmlurl = 'html/';
		indexurl = '';
	}

	//主页初始化
	//1.判断是否是登录
	if (cookie.get('username')) {
		//		console.log('登录');
		$('#wrapper .indexyoukeactive').css('display', 'none');
		$('#wrapper .indexloginactive').css('display', 'block');
		//渲染用户名
		$('#user_name').html(cookie.get('username') + '<i>V0</i>');
		//登录状态才有的功能******************************************************************************************
		//2.工具栏的文字更新
		$('#showloginbox').text('我');
		//2.1 显示个人信息盒子
		$('#tools .user').click(function () {
			isshow = !isshow;
			//******************** 要loginbox盒子显示位置随着头像位置改变  ********************************
			if (isshow) {
				$('#tools #userinfbox').show(); //登录loginbox显示
			} else {
				$('#tools #userinfbox').hide();
			}
		});
	} else {
		//没登录
		$('#wrapper .indexyoukeactive').css('display', 'block');
		$('#wrapper .indexloginactive').css('display', 'none');
		//没登录时的功能
		//2工具栏的文字更新
		$('#showloginbox').text('未登录');
		//2.1 头像点击显示loginbox
		$('#tools .user').click(function () {
			isshow = !isshow;
			//******************** 要loginbox盒子显示位置随着头像位置改变  ********************************
			if (isshow) {
				$('#tools #loginbox').show(); //登录loginbox显示
				//验证码初始化
				var toolcode = randomCode(4);
				$('#toolshowcode').text(toolcode);
				//点击工具栏登录按钮
				$('#tools #loginbox #toolsubmit').click(function () {
					var toolusername = $('#tools #loginbox #toolusername').val().trim();
					var toolpassword = $('#tools #loginbox #toolpassword').val().trim();
					if (toolusername && toolpassword) {
						if (checkCode($('#toolinputcode').val().trim(), toolcode)) {
							console.log('toolcode正确');
							$.ajax({ //进行用户登录验证
								type: "post",
								url: apiurl + "api/query.php",
								data: "action=login&name=" + toolusername + '&psw=' + toolpassword,
								async: true,
								success: function (str) {
									if (str == 'yes') {
										cookie.set('username', toolusername, {
											path: '/'
										});
										location.reload();
									} else {
										alert('登录失败');
									}
								}
							});
						} else {
							$('#toolinputcode').focus();
						}
					} else {
						$('#toolusername').focus();
					}
				});
			} else {
				$('#tools #loginbox').hide();
			}
		});
	}

	//点击登录注册按钮实现不同功能
	$('#wrapper .indexyoukeactive li').click(function () {
		var loginway = ['登录', '注册'];
		if ($(this).index() < 2) {
			console.log('login');
			location.href = htmlurl + 'login.html?' + 'loginway=' + loginway[$(this).index()];
		}
	});

	//点击item楼层标题刷新页面
	$('#content .item .itemheader a').click(function () {
		location.href = indexurl + '1.html';
	});

	//点击item二级分类查找商品
	$('#content .item .itembody .itemul1 li a').click(function () {
		location.href = htmlurl + 'search.html?' + 'searchkey=' + $(this).text();
	});

	//header######
	//1.用户退出
	$('#loginexit').click(function () {
		//		console.log('close');
		cookie.remove('username');
		location.href = indexurl + '1.html';
	});

	//logo栏###############################################################################################################
	//1.用户功能按钮都是打开登录界面
	$('#logo .logo_person dl a').click(function () {
		if (cookie.get('username')) {
			//登录
			alert('该功能还未完善，敬请期待');
		} else {
			location.href = htmlurl + 'login.html?loginway=登录';
		}
	});
	//2.dl我的购物车结算商品按钮
	$('#btn-cart').click(function () {
		if (cookie.get('username')) {
			//登录
			location.href = htmlurl + 'shopcar.html?' + 'username=' + cookie.get('username');
		} else {
			location.href = htmlurl + 'login.html?' + 'loginway=登录';
		}
	});
	//3.点击热度关键词搜索
	$('#logo #logo_ul2 li').click(function () {
		location.href = htmlurl + 'search.html?' + 'searchkey=' + $(this).text();
	});
	//点击logo的网站img回到主页
	$('#logo .logo_img1').click(function () {
		location.href = indexurl + '1.html';
	});

	//nav导航分类##########################################################################################################
	//1.点击导航分类时重新加载search页面  detalis.html search.html
	var keyarr = ['', '上装', '鞋靴', '美妆', '套装', 'T恤', '防晒衣', 'POLO衫', '休闲鞋', '下装'];
	$('#nav .nav li').click(function () {
		if (keyarr[$(this).index()]) {
			location.href = htmlurl + 'search.html?' + 'searchkey=' + keyarr[$(this).index()];
		} else {
			location.href = indexurl + '1.html';
		}
	});

	//侧边工具栏功能%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	//1.购物车商品数据加载刷新
	if (cookie.get('username')) {
		shopcar();
		//		console.log(11);
	} else {
		if (toatlprice == 0) {
			//购物车图标有i提示购物车商品种类数
			$('#carcontent .carcontentbottom p').hide();
			$('#shopcarnumtip').hide();
		} else {
			$('#carcontent .carcontentbottom p').show();
			$('#shopcarnumtip').show();
			$('#shopcarnumtip').text($('#carcontent ul li').length);
		}
	}
	//2. 点击购物车li的 a 类名.toolgoodsdelete删除商品li  detalis.html  search.html
	$('#carcontent').on('click', '.toolgoodsdelete', function () {
		$(this).closest('li').remove();
		//更新orders订单数据
		var username = cookie.get('username');
		var goodId = $(this).closest('li').attr('goodid');
		var deleteprice = $(this).prev().children('span').text().slice(1) * 1;
		var deletenum = $(this).prev().children('i').text() * 1;
		$.ajax({
			type: "POST",
			url: apiurl + "api/query.php",
			data: "action=delete&buyername=" + username + "&goodId=" + goodId,
			success: function (str) {
				//数据处理渲染
				if (str == 'yes') {
					//更新总价
					var toatlprice = $('#tooltotalprice').text().slice(1) * 1 - deleteprice * deletenum;
					$('#tooltotalprice').text('¥' + toatlprice);
					//更新图标提示内容
					if (toatlprice == 0) {
						$('#carcontent .carcontentbottom p').hide();
						$('#shopcarnumtip').hide();
					} else {
						$('#carcontent .carcontentbottom p').show();
						$('#shopcarnumtip').show();
						$('#shopcarnumtip').text($('#carcontent ul li').length);
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

	//点击loginbox的 X 关闭盒子
	$('#loginbox .closeinput').click(function () {
		//头像点击登录
		isshow = false;
		$('#tools #loginbox').hide();
	});

	$('#tools .closetools').click(function () {
		$(this).animate({
			right: "-80px"
		}, 600, function () {
			$(this).css('display', 'none'); //移动到右边就隐藏
			$(this).prev('div').css('right', '-80px'); //扩展菜单瞬间移动右侧并显示出来
			$(this).prev('div').css('display', 'block');
			//显示出来的扩展菜单从右侧回来
			$(this).prev('div').animate({
				right: "0px"
			}, 300);
		});
	});

	$('#tools .opentools .close').click(function () {
		$(this).parent().animate({
			right: "-80px"
		}, 600, function () {
			$(this).css('display', 'none'); //移动到右边就隐藏
			$(this).next('div').css('right', '-80px'); //扩展菜单瞬间移动右侧并显示出来
			$(this).next('div').css('display', 'block');
			//显示出来的扩展菜单从右侧回来
			$(this).next('div').animate({
				right: "0px"
			}, 300);
		});
		$('#tools #loginbox').hide();
		$('#tools #userinfbox').hide();
		isshow = false;
		$('#carbox').animate({
			right: '-250px'
		}, 600, function () {
			isok = true;
		});
	});

	//购物车点击显示
	$('#tools .opentools .shopcar').click(function () {
		var rig = "-250px";
		if (isok) {
			rig = '5px';
		}
		$('#carbox').animate({
			right: rig
		}, 600, function () {
			isok = !isok;
		});
	});

	//顶部点击回到顶部
	$('#tools #backtop').click(function () {
		window.scrollTo(0, 0);
	});
	//点击购物车close关闭
	$('#toolclosecarshop').click(function () {
		$('#carbox').animate({
			right: '-250px'
		}, 600, function () {
			isok = true;
		});
	});
	//点击结算商品
	$('#toolgoodsaccount').click(function () {
		//页面跳转到购物车页********************************************************
		if (cookie.get('username')) {
			location.href = htmlurl + 'shopcar.html?username=' + cookie.get('username');
		} else {
			location.href = htmlurl + 'login.html?loginway=登录';
		}
	});
});
//添加订单进表orders
function addorders(goodId, num, nummax, $ele) {
	if (cookie.get('username')) {
		//		if(num >= 1 && num <= nummax) { //合理的数量范围才创建订单
		var buyername = cookie.get('username');
		//传数据，添加表数据
		$.ajax({
			type: "POST",
			url: "../api/query.php",
			data: "action=add&goodId=" + goodId + "&buyername=" + buyername + "&num=" + num,
			success: function (str) {
				//数据渲染
				if (str == 'yes') {
					//					location.reload();
					//过渡动画
					if ($ele) {
						console.log($ele.closest('li'));
						var tp = document.documentElement.clientTop;
						var lt = document.documentElement.clientLeft;
						var rect = $ele.closest('li')[0].getBoundingClientRect();
						var shopcarrect = $('#shopcar')[0].getBoundingClientRect();
						//获取当前点击的父辈li的位置
						var t = rect.top - tp;
						var l = rect.left - lt;
						//获取购物车位置
						var shopcart = shopcarrect.top - tp;
						var shopcarl = shopcarrect.left - lt;

						$ele.closest('li').clone().css({
							position: 'fixed',
							top: t,
							background: '#777',
							left: l,
							opacity: 0.3,
							'z-index': 2022
						}).prependTo('#goodsrender').animate({
							top: shopcart,
							left: shopcarl,
							width: '22px',
							height: '28px'
						}, 300, function () {
							var $_this = $(this);
							var timer = setTimeout(function () {
								$_this.remove();
							}, 500);
						});
					}
					shopcar();
				} else if (str == 'no') {
					console.log('加入购物车失败');
				} else if (str == 'error1') {
					alert('商品库存不足');
					location.reload();
				} else {
					alert('商品订单数量不符合要求');
					location.reload();
				}
			},
			error: function (xhr) {
				alert(xhr.responseText);
			}
		});
		//		}
	} else {
		//跳转到登录界面
		location.href = 'login.html?' + 'loginway=登录';
	}
}

//购物车所需数据查找函数和渲染
function shopcar() {
	var buyername = cookie.get('username');
	$.ajax({
		type: "POST",
		url: apiurl + "api/query.php",
		data: "action=shopcar&buyername=" + buyername,
		success: function (str) {
			//数据处理渲染
			$('#carcontent ul').html(shopcarrender(str));
			if (toatlprice == 0) {
				//购物车图标有i提示购物车商品种类数
				$('#carcontent .carcontentbottom p').hide();
				$('#shopcarnumtip').hide();
			} else {
				$('#carcontent .carcontentbottom p').show();
				$('#shopcarnumtip').show();
				$('#shopcarnumtip').text($('#carcontent ul li').length);
			}
		},
		error: function (xhr) {
			alert(xhr.responseText);
		}
	});
}
//购物车渲染数据处理函数
function shopcarrender(str) {
	toatlprice = 0;
	var arr = JSON.parse(str);
	if (arr.length != 0) {
		//用户购物车有数据
		var s = arr.map(function (item) {
			toatlprice += item.price * item.num;
			return `<li goodid="${item.goodId}">
						<img src="${indexurl}img/${item.img}" />
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