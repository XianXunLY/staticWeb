jQuery($ => {
	//1.点击商品分类列表，打开不同的详情页
	$('#content .item .itemul2 ul').on('click', 'li', function() { //时间委托，处理动态创建的li点击事件
		console.log($(this).prop('id')); //获取渲染出来时自定义属性
		var goodsid = $(this).prop('id');
		location.href = 'html/detail.html?' + 'goodsId=' + goodsid;
	});

	//2.数据查询
	$.ajax({
		type: "POST",
		url: "api/query.php",
		data: "action=init&assortment=上装",
		success: function(str) {
			//数据渲染
			$('#item1 .itemul2 ul').html(render(str));
		},
		error: function(xhr) {
			alert(xhr.responseText);
		}
	});
	$.ajax({
		type: "POST",
		url: "api/query.php",
		data: "action=init&assortment=下装",
		success: function(str) {
			//数据渲染
			$('#item2 .itemul2 ul').html(render(str));
		},
		error: function(xhr) {
			alert(xhr.responseText);
		}
	});

	function render(str) {
		var arr = JSON.parse(str);
		var s = arr.map(function(item) { //map方法返回的是个数组，用join方法把它变成可以用来渲染的字符串
			return `<li id="${item.goodId}">
						<div class="goodsimg">
							<a class="clearfix"><img src="img/${item.img}"></a>
							<span class="clearfix"><i>今日</i></span>
						</div>
						<div class="goodsname">
							<a>${item.goodname}</a>
						</div>
						<div class="goodsprice">
							<span><em></em>￥${item.shopprice}</span>
							<a>去下单</a>
						</div>
					</li>`;
		}).join('');
		return s;
	}
});