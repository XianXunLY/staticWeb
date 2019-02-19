$(function (){
	var data = decodeURI(location.search); //获取界面的url参数 如：'?searchkey=上装'
	var id = data.slice(9); //剪切得到商品goodid
	var totalnum = 68; //存放当前商品数量 self
	var num = 1; //存放当前购买数量 self

	//查询数据
	$.ajax({
		type: "POST",
		url: "../api/query.php",
		data: "action=detalis&goodId=" + id,
		success: function (str) {
			//数据渲染
			detailrender(str);
		},
		error: function (xhr) {
			alert(xhr.responseText);
		}
	});

	function detailstitle() {

		//内容标题更新,通过ajax查分类;
		$('#searchContent p span')[0].innerHTML = '> ' + str;
		//通过关键词用ajax查询数据并渲染出来
	}

	function detailrender(str) {
		//细节渲染函数
		var arr = JSON.parse(str);
		num = arr.goodTotal;
		var s = arr.map(function (item) {
			$('#detailsimgall img').attr('src', '../img/' + item.img);
			$('#joinnum').text(item.sellnumber);
			$('#collectnum').text(item.sellnumber);
			$('#h1goodname').text(item.goodname);
			$('#goodsprice p em').text('¥' + item.marketprice);
			$('#goodsprice p strong').text('¥' + item.shopprice);
			$('#goodsprice p i').text(item.assessnumber);
			$('#detailsstorename').text(item.storename);
			$('#goodlinkul li').eq(1).children('i').text(item.assessnumber);
			$('#goodlinkul li').eq(2).children('i').text(item.sellnumber);
			return;
		}).join('');
		return s;
	}

	//点击商品数量增加或减少
	$('#detailsincrease').click(function () {
		//获取当前的输入框的值
		num = $('#quantity').val().trim();
		num >= totalnum ? totalnum : num++;
		$('#quantity').val(num);
		//		console.log(num);
	});
	$('#detailsdecrease').click(function () {
		//获取当前的输入框的值
		num = $('#quantity').val().trim();
		num <= 1 ? 1 : num--;
		$('#quantity').val(num);
	});

	//点击加入购物车，添加订单数据
	$('#detailsaddgoods').click(function () {
		//获取当前的输入框的值
		num = $('#quantity').val().trim();
		//如果当前是登录状态

		addorders(id, num, totalnum); //添加订单进orders
	});
});