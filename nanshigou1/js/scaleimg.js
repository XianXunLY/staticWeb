jQuery($ => {
	var imgselfbox = $('#imgself'); //自身图片盒子
	var scaleimg = $('#scaleimgbox img'); //放大后的图片元素
	var imgscalebox = $('#scaleimgbox'); //放大的图片盒子
	var scalebox = $('#scalebox'); //放大镜盒子

	//鼠标移进阻止默认滚动行为
	$('#details .detailsimgtop #imgself').mouseover(function() {
		document.onmousewheel = function(evt) {
			evt.cancelBubble = true;
			evt.returnValue = false;
		}
	});

	//鼠标移出隐藏盒子与进行默认滚动行为
	$('#details .detailsimgtop #imgself').mouseleave(function() {
		//1.显示scalebox
		$('#scaleimgbox').hide();
		//2.显示scaleimgbox
		$('#scalebox').hide();
		document.onmousewheel = function(evt) {
			evt.cancelBubble = false;
			evt.returnValue = true;
		}
	});

	//鼠标移进原来图片盒子就放大显示
	$('#details .detailsimgtop #imgself').mousemove(function(e) {
		//1.显示scalebox imgscalebox
		scalebox.show();
		imgscalebox.show();

		var pagex = e.pageX; //获取当前鼠标相对于文档的位置
		var pagey = e.pageY;

		var imgselfboxtop = imgselfbox.offset().top; //获取图片盒子相对于文档的top
		var imgselfboxleft = imgselfbox.offset().left;

		var scaleboxw = scalebox.width(); //获取镜片盒子scalebox的宽高200
		var scaleboxh = scalebox.height();

		var scaleboxtop = pagey - imgselfboxtop - scaleboxh / 2; //当前鼠标相对于图片盒子的距离减去镜片盒子自身距离的一半作为top left
		var scaleboxleft = pagex - imgselfboxleft - scaleboxw / 2;

		var imgselfboxw = imgselfbox.width() - scaleboxw; //获取当前鼠标相对于文档的位置
		var imgselfboxh = imgselfbox.height() - scaleboxh;

		//限制镜片盒子在图片盒子内部
		scaleboxtop = scaleboxtop < 0 ? 0 : scaleboxtop;
		scaleboxleft = scaleboxleft < 0 ? 0 : scaleboxleft;
		scaleboxtop = scaleboxtop > imgselfboxh ? imgselfboxh : scaleboxtop;
		scaleboxleft = scaleboxleft > imgselfboxw ? imgselfboxw : scaleboxleft;
		//随着鼠标改变位置改变镜片盒子在图片盒子内部的相对定位
		scalebox.css({
			top: scaleboxtop,
			left: scaleboxleft
		});
		//根据 放大盒子宽高度 和 放大图片的宽高度差   运算出  放大图片 相对 放大盒子 的  最大相对距离
		var maxl = imgscalebox.width() - scaleimg.width();
		var maxt = imgscalebox.children('.scaleimg').height() - scaleimg.height();
		// 计算  放大图片 相对 放大盒子 的  相对距离
		//根据放大镜盒子与原本图片的比例计算
		var scalenum = scalebox.width() / imgselfbox.width();
		//重设放大图片宽高
		resetscaleimg();
		var scaleimgl = -scaleboxleft / scalenum;
		var scaleimgt = -scaleboxtop / scalenum;

		//控制放大图片 填满 放大盒子
		scaleimgl = scaleimgl < maxl ? maxl : scaleimgl;
		scaleimgt = scaleimgt < maxt ? maxt : scaleimgt;
		scaleimg.css({
			top: scaleimgt,
			left: scaleimgl
		});
	});

	function resetscaleimg() {//重新设置放大图片的宽高
		var scalenum = scalebox.width() / imgselfbox.width();
		scaleimg.width(parseInt(imgscalebox.width() / scalenum));
		scaleimg.height(parseInt(imgscalebox.width() / scalenum));
	}

	var istrue = true;
	//放大镜盒子滚动事件
	$('#imgself')[0].onmousewheel = fn;

	function fn(ev) {
		//判断滚轮方向
		var ev = ev || event;
		//true:向上滚了，false：向下滚了
		if(ev.wheelDelta) {
			//ie 谷歌  规定：大于0 上滚，小于0下滚
			istrue = ev.wheelDelta > 0 ? true : false;
		} else {
			//火狐
			istrue = ev.detail < 0 ? true : false;
		}
		//		console.log(istrue);
		var speed = 5;
		//获取当前放大镜盒子的宽度
		var scaleboxw = $('#scalebox').width();

		if(istrue) { //上滚缩小放大镜盒子
			speed = 5;
		} else { //下滚放大放大镜盒子
			speed = -5;
		}
		scaleboxw += speed;
		//放大镜盒子临界条件判断
		if (scaleboxw > imgselfbox.width()) {
			scaleboxw = imgselfbox.width();
		} else if(scaleboxw < imgselfbox.width()/5){
			scaleboxw = imgselfbox.width()/5;
		}
		//		console.log(scaleboxw);
		$('#scalebox').width(scaleboxw);
		$('#scalebox').height(scaleboxw);
		resetscaleimg();
	}

});