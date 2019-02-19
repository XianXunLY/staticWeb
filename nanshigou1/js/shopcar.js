$(function (){
	var totalprice = 0; //某类商品总价格
	var totalfree = 0; //所有商品总费用
	var storemoney = 0; //店铺总费用
	var isall = false; //全选开关
	var storegoodnum = []; //存每个店铺的商品个数
	if (cookie.get('username')) {
		//隐藏侧栏小购物车图标
		$('#shopcar').hide();
		$('#shopcar').next().css('margin-top', '0');
	}

	//logo#####################
	//点击logo的网站img回到主页
	$('#logo .logo_img').click(function () {
		location.href = '../1.html';
	});

	//table #####################

	//2.获取当前用户的订单信息并渲染
	carshop();
	//初始化商品数量增减事件
	$('tbody').on('click', '.decrease', function () {
		var num = $(this).next().val() * 1 - 1;
		//临界条件
		num = num > 0 ? num : 1;
		$(this).next().val(num);
		//更新商品列表
		if (num != 0) {
			var goodId = $(this).closest('tr').attr('goodid');
			console.log(goodId);
			addorders(goodId, -1, 99, '');
			location.reload();
		}
	});
	$('tbody').on('click', '.increase', function () {
		var num = $(this).prev().val() * 1 + 1;
		//临界条件
		num = num < 99 ? num : 99;
		//更新商品列表
		var goodId = $(this).closest('tr').attr('goodid');
		$(this).prev().val(num);
		addorders(goodId, 1, 99, '');
		location.reload();
	});
	//数量框输入失去焦点事件
	$('tbody').on('click', '.updatenum', function () {
		var goodId = $(this).closest('tr').attr('goodid');
		var currentnum = $(this).val() * 1; //获取当前商品定单的数量
		$('tbody').on('blur', '.updatenum', function () {
			var v = $(this).val() * 1 - currentnum; //求输入后的商品定单的数量 与 之前数量的差值，可正可负 
			console.log(v);
			addorders(goodId, v, 99, '');
			location.reload();
		});
	});
	//点击删除按钮删除订单
	$('tbody').on('click', '.gooddelete', function () {
		//更新orders订单数据
		console.log($(this));
		var username = cookie.get('username');
		var goodId = $(this).closest('tr').attr('goodid');
		$.ajax({
			type: "POST",
			url: apiurl + "api/query.php",
			data: "action=delete&buyername=" + username + "&goodId=" + goodId,
			success: function (str) {
				//数据处理渲染
				if (str == 'yes') {
					location.reload();
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

	//渲染数据查询渲染函数
	function carshop() {
		var buyername = cookie.get('username');
		$.ajax({
			type: "POST",
			url: "../api/query.php",
			data: "action=shopcar&buyername=" + buyername,
			success: function (str) {
				//数据处理渲染
				$('tbody').html(rendercarshop(str));
				$('#cartTotal').html(totalfree);
				console.log(storegoodnum);
				//table############################################
				//1.全选按钮
				$('#selectAll').click(function () {
					var $inpu = $('table input'); //找到所有的input商品列
					$inpu.prop('checked', this.checked);
					if ($('#selectAll')[0].checked) {
						//一个个更新某个店铺总价
						for (var a = 0; a < $('tbody span').length; a++) {
							//获取店铺数量
							for (var b = 0; b < storegoodnum[a]; b++) {
								//获取店铺商品数量
								//获取商品下标
								var d = 0;
								for (var c = 0; c < a; c++) {
									d += storegoodnum[c];
								}
								storefree(a, $('tbody .storemoney')[d + b].innerHTML * 1);
							}
						}
						//更新总价
						totalmoney();
					} else {
						$('#cartTotal').html(0);
						$('tbody span').html(0);
					}
				});

				//2.点击tbody的选中按钮
				$('tbody').on('click', 'input', function () {
					//事件委托
					var storenum = $(this).attr('class'); //找到所有的input商品列
					if (storenum != 'updatenum') {
						//点击的是商品勾选input
						//获取某类商品的总价格
						totalprice = $(this).closest('td').siblings('.storemoney').text() * 1;
						var idx = storenum.slice(5) * 1;
						if ($(this)[0].checked) {
							console.log('选中');
							storefree(idx - 1, totalprice);
						} else {
							console.log('不选中');
							storefree(idx - 1, -totalprice);
						}
					}
				});

				//更新店铺小计总价
				function storefree(idx, totalprice) {
					storemoney = $('tbody span')[idx].innerHTML * 1 + totalprice;
					$('tbody span')[idx].innerHTML = storemoney;
					totalmoney();
				}
				//更新总费用
				function totalmoney() {
					$ele = $('tbody input:checked').closest('td').siblings('.storemoney');
					var total = 0;
					for (var a = 0; a < $('tbody span').length; a++) {
						total += $('tbody span')[a].innerHTML * 1;
					}

					$('#cartTotal').html(total);
				}
			},
			error: function (xhr) {
				alert(xhr.responseText);
			}
		});
	}
	//购物车渲染数据处理函数
	function rendercarshop(str) {
		totalprice = 0;
		var arr = JSON.parse(str);
		if (arr.length != 0) {
			//用户购物车有数据
			var arrnums = arr.length;
			var currentstorename = ''; //存放当前店铺名
			var i = 0; //用来指示商品属于哪个店铺
			var j = 1; //用来指示店铺有几个商品
			var s = arr.map(function (item, index) {
				if (item.storename != currentstorename) {
					//如果item店铺名与当前店铺名不一样，新建一个分类
					i++;
					var html = `<tr class='newstore'>
							<th colspan="20" style="text-align: left;"><strong>店铺：<a>${item.storename}</a></strong></span>
							</th>
						</tr>
						<tr goodid="${item.goodId}">
							<td>
								<input class="store${i}" checked type="checkbox" />
							</td>
							<td class="tdtextleft"><img src="../img/${item.img}" /></td>
							<td class="tdtextleft">
								<a>${item.goodname}</a>
							</td>
							<td>${item.price}</td>
							<td>
								<i title="减少商品件数" class="decrease">-</i>
								<input class="updatenum" type="text" value="${item.num}" />
								<i title="增加商品件数" class="increase">+</i>
							</td>
							<td class="storemoney">${item.price * item.num}</td>
							<td class="borderright">
								<a>收藏</a>
								<a class="gooddelete">删除</a>
							</td>
						</tr>`;
					if (index != 0) {
						totalfree += totalprice;
						storegoodnum.push(j);
						j = 1;
						html = `<tr class="tbodyfoot">
									<th colspan="20" style="text-align: right;">店铺合计：<span class="store${i}">${totalprice} 元</span>
									</th>
								</tr>` + html;
						totalprice = 0; //新的店铺序列头创建时更新为当前商品价格
					}
					totalprice += item.price * item.num; //存当前总价格
					if (index == arrnums - 1) {
						i++;
						totalfree += totalprice;
						storegoodnum.push(j);
						html += `<tr class="tbodyfoot">
									<th colspan="20" style="text-align: right;">店铺合计：<span class="store${i}">${totalprice} 元</span>
									</th>
								</tr>`;
					}
					currentstorename = item.storename; //更新当前的店铺名
					return html;
				} else {
					currentstorename = item.storename; //更新当前的店铺名
					totalprice += item.price * item.num; //存当前总价格
					j++;
					html = `<tr goodid="${item.goodId}">
							<td>
								<input class="store${i}" checked type="checkbox" />
							</td>
							<td class="tdtextleft"><img src="../img/${item.img}" /></td>
							<td class="tdtextleft">
								<a>${item.goodname}</a>
							</td>
							<td>${item.price}</td>
							<td>
								<i title="减少商品件数" class="decrease">-</i>
								<input class="updatenum" type="text" value="${item.num}" />
								<i title="增加商品件数" class="increase">+</i>
							</td>
							<td class="storemoney"">${item.price * item.num}</td>
							<td class="borderright">
								<a>收藏</a>
								<a class="gooddelete">删除</a>
							</td>
						</tr>`;
					if (index == arrnums - 1) {
						i++;
						totalfree += totalprice;
						storegoodnum.push(j);
						html += `<tr class="tbodyfoot">
									<th colspan="20" style="text-align: right;">店铺合计：<span class="store${i}">${totalprice} 元</span>
									</th>
								</tr>`;
					}
					return html;
				}
			}).join('');
			$('#tooltotalprice').text('¥' + totalprice);
			return s;
		} else {
			return `<li>
						<p style="text-align:center;margin-top: 10px;">暂无商品</p>
					</li>`;
		}
	}
});