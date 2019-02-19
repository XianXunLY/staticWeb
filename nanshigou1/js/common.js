/** [随机颜色]
 * @param { } 参数1 { }
 * @param { } 参数2 { }
 * @param { } 参数3 { }
 * @return { } 返回值 { }
 */

/** 
 * [随机颜色]
 * @return {String} 返回值 {backgroundColor的rgb(,,)属性}
 */
function randomColor(type) {
	if (type === 'rgb') {
		var r = parseInt(Math.random() * 256);
		var g = parseInt(Math.random() * 256);
		var b = parseInt(Math.random() * 256);
		return 'rgb(' + r + ', ' + g + ', ' + b + ')'; //返回字符串'rgb(随机数,随机数,随机数)'
	} else {
		var res = '#';
		var str = '0123456789abcdef';
		for (var i = 0; i < 6; i++) {
			res += str[parseInt(Math.random() * str.length)];
		}
		return res;
	}
}

/** [随机生成任意范围的随机数]
 * @param { Number} n2 { 最小值}
 * @param { Number} n3 { 最大值}
 * @return {String } str {n个符合要求的数组成的字符串}
 */
function randomnumber(n2, n3) {
	var res = parseInt(Math.random() * (n3 - n2 + 1)) + parseInt(n2);
	return res;
}

/** [求n的阶乘]
 * @param {Number } num {求num的阶乘}
 * @return {Number } 返回值 { 所求阶乘结果}
 */
function fac(num) {
	if (num <= 1) {
		return 1;
	}
	return num * fac(num - 1);
}

/** [开关]
 * @param {string } box {点击节点的名字 }
 * @param {string} menu {可以隐藏的菜单的名字 }
 */
function swich(box, menu) {
	var box = document.getElementById(box);
	var menu = document.getElementById(menu);
	var bool = true;
	box.onclick = function () {
		if (bool) {
			menu.style.display = 'block';
			bool = !bool;
		} else {
			menu.style.display = 'none';
			bool = !bool;
		}
	};
}

/** [下拉菜单]
 * @param {string } box {下拉菜单与所在的盒子 }
 * @param {string} menu { 隐藏起来的菜单}
 */
function pullmenu(box, menu) {
	box.onmouseover = function () {
		menu.style.display = 'block';
	};
	box.onmouseout = function () {
		menu.style.display = 'none';
	};
}

/** [选项卡]  //调用成功，但建立的盒子层次要固定结构
 * @param {string } box {套着选项卡的盒子id名 }
 * @param {string } active {选项事件触发时改变的样式class名 }
 */
function tab(boxId, active) {
	//参数为字符串，用引号
	var box = document.getElementById(boxId);
	var menu = document.getElementsByTagName('ul')[0];
	//console.log(box);
	var aLis = menu.getElementsByTagName('li'); //通过标签名查找元素门
	var aDivs = box.getElementsByTagName('div');

	for (var i = 0; i < aLis.length; i++) {
		aLis[i].index = i; //绑定索引值，标记
		aLis[i].onmouseout = function () {
			//鼠标移除清掉所有出现的菜单内容
			aDivs[this.index].style.display = 'none';
		};
		aLis[i].onmouseover = function () {
			for (var i = 0; i < aLis.length; i++) {
				//清空其他，排他思想
				aLis[i].className = '';
				aDivs[i].style.display = 'none';
			} //当前的
			this.className = active;
			aDivs[this.index].style.display = 'block';
		};
	}
}

/**
 * //判断某个数组是否包含某个元素,  基本用不到，系统有自己的方法
 * @param {Object数组} a {数组}
 * @param {任意类型} every {拿来匹配的元素}
 * @return {boolean} 返回值 { }
 */
function arrhas(a, every) {
	for (var i = 0; i <= a.length; i++) {
		if (a[i] === every) {
			return true;
		}
	}
	return false;
}

/** [随机验证码完善版]//调用成功
 * @param {Number } n { 生成n位数的验证码}
 * @return {String } 返回值 { 生成的n位验证码}
 */
function randomCode(n) {
	//定义验证码组成内容字符串
	var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var arr = str.split(''); //把内容字符串分割成数组
	var code = ''; //定义储存验证码
	for (var i = 0; i < n; i++) {
		var num = parseInt(Math.random() * 62);
		code += arr[num]; //生成每位验证码并拼接
	}
	return code; //返回生成的验证码
}

/** [随机验证码验证忽略大小写]//调用成功
 * @param {String} input { 输入的验证码}
 * @param {String} code { 随机生成的验证码}
 * @return {Boolean } 返回值 { 验证码输入正确与否}
 */
function checkCode(input, code) {
	console.log(code);
	var _code = new RegExp(code, 'ig'); //正则
	var bool = input.replace(_code, 'true'); //如果输入的验证码跟随机的正则匹配，则说明验证码正确
	if (bool === 'true') {
		return true;
	} else {
		return false;
	}
}

/** [过滤敏感词汇]//调用成功
 * @param {String} tex {要过滤（输入框）的字符串内容 }
 * @return {String} 返回值 {过滤后的输入框字符串}
 */
function filtertex(tex) {
	var str = ['妈蛋', '靠', '非暴力不合作']; //敏感词汇数组
	if (tex) {
		str.forEach(function (item) {
			var reg = new RegExp(item, 'ig');
			tex = tex.replace(reg, '**');
		});
	}
	return tex;
}

/** [解析地址,把字符串转化成对象]//调用成功
 * @param {String} str {要解析网址的参数内容，问号后面的部分 }
 * @return {Object} 返回值 {网址解析后返回的对象}
 */
function strToObj(str) {
	var obj = {};
	var arr = str.split('&'); //split把字符串切割成数组
	for (var i in arr) {
		var arr2 = arr[i].split('=');
		obj[arr2[0]] = arr2[1];
	}
	return obj;
}

/** [解析地址,把字符串转化成对象]//调用成功
 * @param {Object} obj {包含网址参数的对象}
 * @return {String} 返回值 {拼接成功后的网址参数字符串，问号后面的部分}
 */
function objToStr(obj) {
	var str = ''; //定义空字符串存值
	for (var key in obj) {
		//遍历对象，拼接字符串
		str += key + '=' + obj[key] + '&'; //形式：age=18&score=89&,会拼多一个&;
	}
	str = str.slice(0, -1); //把多余的剪掉
	return str;
}

/**[补零操作]//调用成功
 * @param {Number} h {要补零的数}
 * @return {String} 返回值 {补零后的字符串}
 */

function setdb(h) {
	h = h < 10 ? '0' + h : h;
	return h;
}

/**[不管窗口怎么改变，盒子都自动居中]//调用成功
 * @param {String} box {要居中的盒子节点}
 * @param {Function} fn {回调函数，倒计时结束后页面要进行的操作}
 */
function centerBox(box) {
	box.style.left = (window.innerWidth - box.offsetWidth) / 2 + 'px';
	box.style.top = (window.innerHeight - box.offsetHeight) / 2 + 'px';
	window.onresize = function () {
		//窗口改变时
		box.style.left = (window.innerWidth - box.offsetWidth) / 2 + 'px';
		box.style.top = (window.innerHeight - box.offsetHeight) / 2 + 'px';
	};
}

/**[吸顶菜单]//调用成功
 * @param {String} header {吸顶菜单的上一个盒子节点}
 * @param {String} menu {吸顶菜单的盒子节点}
 */
function menufixed(header, menu) {
	var menutop = menu.offsetTop; //获取页面初始化时吸顶菜单到顶部的距离
	console.log(menutop);
	var menuheight = menu.offsetHeight; //获取吸顶菜单自身的高度
	window.onscroll = function () {
		var scrolly = window.scrollY; //获取当前窗口滚动的距离
		if (scrolly >= menutop) {
			menu.style.position = 'fixed';
			menu.style.top = 0;
			//添加类名增加样式
			header.style.marginBottom = menuheight + 'px'; //菜单吸顶后，其他盒子的位置会改变，所以添加一个margin填充菜单本来的位置，高度为菜单自身高度
		} else {
			menu.style.position = ''; //修改回原来的样式
			header.style.marginBottom = 0 + 'px';
		}
	};
}

//正则json数据
var objReg = {
	'账号': '/^\\w{6,20}$/',
	'昵称': '/^.{4,6}$/',
	'邮箱': '/^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/',
	'身份证号': '/^\\d{15}|\\d{18}$/',
	'手机号': '/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/',
	'出生日期': '/^\\d{4}-\\d{1,2}-\\d{1,2}$/',
	'密码': '/.{6,18}/'

	/**[表单验证]
  * @param {Object} arr {所有要验证的input框的名字数组} //['账号','昵称','邮箱']
  * @param {Object} eles {所有输入框类数组input}
  * @param {Object} spans {所有提示框类数组span}
  */
};function tableCheck(str, eles, spans) {
	for (var n = 0; n < spans.length; n++) {
		//用let缩小作用域，就不用自定义index索引
		eles[n].onblur = function () {
			//给所有input节点绑定事件
			regCheck(str[n], eles[n].value.trim(), spans[n]);
		};
	}
}

/**[提取当前要用来验证的正则]
 * @param {String} str {当前要验证的input框的名字字符串} //['账号','昵称','邮箱']
 * @param {String} eles {当前输入框input的输入内容}
 * @param {Object} spans {当前提示框span节点}
 */
function regCheck(str, eleval, span) {
	//	console.log(span);
	if (objReg[str]) {
		//当前输入框类型的正则 存在就执行
		var reg = new RegExp(objReg[str].slice(1, -1)); //提取正则
		if (!span) {
			return reg.test(eleval);
		} else {
			checkTips(reg, str, eleval, span);
		}
	} else {
		alert('要验证的' + str + '的正则规则不存在，请添加正则或检查' + str + '是否有错');
	}
}

/**[正则验证时的提示渲染]
 * @param {Object} reg {正则表达式}
 * @param {String} str {当前要验证的input框的名字字符串} //['账号','昵称','邮箱']
 * @param {String} eles {当前输入框input的输入内容}
 * @param {Object} spans {当前提示框span节点}
 */
function checkTips(reg, str, eleval, span) {
	if (eleval) {
		//非空
		if (reg.test(eleval)) {
			span.innerHTML = str + '账号正确';
		} else {
			span.innerHTML = str + '不符合要求';
		}
	} else {
		span.innerHTML = '空' + str + '，请输入' + str;
	}
}

/**[深度拷贝，可以对引用对象进行深度拷贝]//
 * @param {Object} obj {引用对象}
 * @return {Object} 返回值 {新的对象，跟原对象一样}
 */
function deepClone(obj) {
	var str = JSON.stringify(obj);
	return JSON.parse(str);
}

/**[获取样式，兼容版本]//不管行内非行内都能获取
 * @param {Object} obj {要获取样式的元素对象}
 * @param {String} name {样式名字}
 * @return {String} 返回值 {样式内容}
 */
function getStyle(obj, name) {
	if (getComputedStyle(obj, false)) {
		return getComputedStyle(obj, false)[name];
	} else {
		return obj.currentStyle(name);
	}
}

/*
 	设置和获取行内样式：css(节点,'width','40px') 设置样式  css(节点，'color') 获取样式
 	两个个参数：获取行内样式
 	三个参数：设置样式
*/

function css() {
	//设置样式：设置行内的样式
	if (arguments.length == 2) {
		//获取样式
		return arguments[0].style[arguments[1]];
	} else if (arguments.length == 3) {
		arguments[0].style[arguments[1]] = arguments[2];
	}
}

/*
	getid(id) :通过id查找元素
	形参：
		id: id值
	
*/
function getId(id) {
	return document.getElementById(id);
}

/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

	clearInterval(obj.timer); //防止定时器叠加
	obj.timer = setInterval(function () {

		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for (var key in json) {
			//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if (key == 'opacity') {
				//如果要修改的属性为透明度
				cur = getStyle(obj, key) * 100; //获取当前透明度
			} else {
				//其它属性
				cur = parseInt(getStyle(obj, key)); //width heigth borderwidth 获取不带单位px的整数
			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			if (cur != json[key]) {
				//如果当前属性没有达到目标值，
				istrue = false; //开关false
			} else {
				istrue = true; //开关true
			}

			//3、运动
			if (key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
			} else {
				obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
			}
		}

		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		//当回调函数为自身时，就会产生时间差异，达到属性的先后改变可控
		if (istrue) {
			//如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if (fnend) {
				//可选参数函数存在就执行，不存在就跳过
				fnend();
			}
		}
	}, 30); //obj.timer 每个对象都有自己定时器
}

function lunbo(box, alis, spans, spanstyle, nextBtn, prevBtn) {
	var iW = alis[0].offsetWidth; //获取图片宽度
	//1.所有的图片放在右侧，第一张放在可视区 
	//console.log(iW);
	for (var i = 0; i < alis.length; i++) {
		css(alis[i], 'left', iW + 'px'); //所有图片右移动一个图片宽
	}
	css(alis[0], 'left', 0); //第一张放中央

	var num = 0; //可视区的图片下标
	var timer = null;

	//下一张函数
	var next = () => {
		//旧图动态挪走 alis[now]
		startMove(alis[num], {
			'left': -iW
		});
		//新图进入可视区
		num = ++num >= alis.length ? 0 : num; //临界值的判断，如果当前下标溢出就重置
		//快速把新图放在右侧：不需要过渡
		css(alis[num], 'left', iW + 'px');
		//下一张图动态移进来，移进来前要确保新图在右侧（途径：把新图快速放回右侧）
		startMove(alis[num], {
			'left': 0
		}); //动态移动新图进中央
		spanNow(); //调用焦点函数
	};

	//焦点跟随
	var spanNow = () => {
		for (var i = 0; i < spans.length; i++) {
			spans[i].className = '';
		}
		spans[num].className = spanstyle;
	};

	timer = setInterval(next, 2000); //每隔两秒切换一个图片

	//鼠标进入可视区，停止定时器，移开又开始自动轮播
	box.onmouseover = () => {
		clearInterval(timer);
	};

	box.onmouseout = () => {
		clearInterval(timer);
		timer = setInterval(next, 2000); //每隔两秒切换一个图片
	};

	var old = new Date();
	nextBtn.onclick = () => {
		//点击切换下一张
		if (new Date() - old > 500) {
			next();
		}
		old = new Date(); //新旧时间差间隔
	};

	var prev = () => {
		//旧图动态挪到右侧
		startMove(alis[num], {
			'left': iW
		});
		//新图：快速放在左侧，挪进可视区
		num = --num < 0 ? alis.length - 1 : num;
		css(alis[num], 'left', -iW + 'px');
		startMove(alis[num], {
			'left': 0
		});
		spanNow();
	};

	//点击切换上一张
	prevBtn.onclick = () => {
		prev();
	};

	for (var i = 0; i < spans.length; i++) {
		spans[i].index = i;
		spans[i].onclick = function () {
			for (;;) {
				num > this.index ? prev() : next();
				if (num == this.index) break;
			}
		};
	}
}

/**[获取样式，兼容版本]//不管行内非行内都能获取
 * @param {String} method {传数据的方式  get 或者   post}
 * @param {String} objurl {php/json接口地址}
 * @param {String} date {数据}
 * @param {Function} fn {回调函数}
 */
function ajax(method, objurl, data, fn) {
	var xhr = new XMLHttpRequest();
	if (method == 'get' && data) {
		var objurl = objurl + '?' + data; //get方式拼接数据
		xhr.open('GET', objurl, true);
		xhr.send(null);
	} else {
		xhr.open('POST', objurl, true);
		xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded");
		xhr.send(data);
	}
	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (fn) {
					fn(xhr.responseText);
				}
			} else {
				alert('出错了' + xhr.status);
			}
		}
	};
}

/*
 
 滚轮方向判断：rollerDir(ele,callback)
 	参数：
 		ele 对象名
 		callback 回调函数
 	返回值： 返回true（向上滚了） 或者false(向下滚了)

 */
function rollerDir(ele, callback) {
	var istrue = true;
	//IE 谷歌
	ele.onmousewheel = fn;

	//火狐
	if (ele.addEventListener) {
		ele.addEventListener('DOMMouseScroll', fn, false);
	}

	function fn(ev) {
		//判断滚轮方向
		var ev = ev || event;
		//true:向上滚了，false：向下滚了

		if (ev.wheelDelta) {
			//ie 谷歌  规定：大于0 上滚，小于0下滚
			istrue = ev.wheelDelta > 0 ? true : false;
		} else {
			//火狐
			istrue = ev.detail < 0 ? true : false;
		}
		callback(istrue);
		//实参
	}
	return callback(istrue);
}

/*
 	秒转成时间：xx天xx时xx分xx秒   ：  -
 	setTime(num)
 		* 参数： 秒
 		* 返回值： {}数据返回(灵活一点)
 		
 */

function setTime(num) {
	//num是秒数    98876秒  有多少天： xx天xx时xx分xx秒
	var sec = toDB(num % 60); //06 秒
	var min = toDB(Math.floor(num / 60) % 60); //Math.floor(num / 60) % 60     分
	var hour = toDB(Math.floor(num / 60 / 60) % 24); //时
	var day = toDB(Math.floor(num / 60 / 60 / 24)); //天数

	return {
		secs: sec,
		mins: min,
		hours: hour,
		days: day
	};
}

/*
 	cookie的相关操作：var cookie = {}
	子功能：
		存 ：set
		取：get
		删：remove
		
 */

var cookie = {
	set: function (name, value, prop) {
		//name和value是必写参数。prop是json格式的数据
		var str = name + '=' + value; //必写的
		//prop
		//expires:设置失效时间
		if (prop.expires) {
			str += ';expires=' + prop.expires.toUTCString(); //把时间转成字符串 toUTCString
		}
		//prop.path :设置路径
		if (prop.path) {
			str += ';path=' + prop.path;
		}
		//设置访问权限domain
		if (prop.domain) {
			str += ';domain=' + prop.domain;
		}

		//设置：存
		document.cookie = str;
	},
	get: function (key) {
		//获取
		var str = document.cookie; //name=jingjing; psw=123456
		var arr = str.split('; '); //[name=jingjing , psw=123456]
		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('='); //[name,jingjing] [psw,123456]
			if (key == arr2[0]) {
				return arr2[1]; //通过键名取键值
			}
		}
	},
	remove: function (key) {
		//cookie:设置时间失效，设置时间为过去的某个时间
		var now = new Date();
		now.setDate(now.getDate() - 7); //设置成昨天
		console.log(now);
		cookie.set(key, '', {
			expires: now,
			path: '/'
		});
	}
};