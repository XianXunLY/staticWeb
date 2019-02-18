jQuery($ => {
	var data = decodeURI(location.search); //获取界面的url参数 如：'?loginway=登录'
	var str = data.slice(10); //剪切得到查询关键词
	var currentcode = randomCode(4); //存当前验证码
	var phonecode;
	//页面验证码生成
	$('#usernamelogin .concode').text(currentcode); //生成随机验证码

	if(str == '登录') {
		//登录的盒子显示，注册的盒子隐藏
		$('#login').css('display', 'block');
		$('#register').css('display', 'none');
		//点击切换登录方式
		$('#login .loginway p').click(function() {
			$(this).parent().children('p').removeClass('loginactive');
			$(this).addClass('loginactive');
			if($(this).index() == 0) {
				currentcode = randomCode(4);
				console.log(currentcode);
				$('#usernamelogin .concode').text(currentcode); //生成随机验证码
				$('#usernamelogin').fadeIn();
				$('#phonelogin').fadeOut();
			} else {
				currentcode = randomCode(4);
				$('#phonelogin .concode').text(currentcode); //生成随机验证码
				$('#usernamelogin').fadeOut();
				$('#phonelogin').fadeIn();
			}
		});
		$('#login .logincontent input').click(function() {
			$('#login .logincontent div').removeClass('inputactive');
			$(this).parent('div').addClass('inputactive');
		});

		//登录按钮点击后验证账号密码
		$('#userdlbutton').click(function() {
			//非空验证
			var username = $('#lg_username').val().trim();
			var psw = $('#lg_password').val().trim();
			if(username && psw && $('#lg_code').val()) {
				//2.判断验证码
				if(checkCode($('#lg_code').val().trim(), currentcode)) {
					console.log('usercode正确');
					$.ajax({ //进行用户登录验证
						type: "post",
						url: "../api/query.php",
						data: "action=login&name=" + username + '&psw=' + psw,
						async: true,
						success: function(str) {
							if(str == 'yes') {
								if($('#logincookies')[0].checked) {
									var date1 = new Date();
									var date2 = new Date(date1);
									date2.setDate(date1.getDate() + 7); //七天后的时间
									cookie.set('username', username, {
										expires: date2,
										path: '/'
									});
								} else {
									cookie.set('username', username, {
										path: '/'
									});
								}
								location.href = '../1.html';
							} else {
								alert('登录失败');
							}
						}
					});
				} else {
					console.log('usercode不正确');
					currentcode = randomCode(4); //存当前验证码
					console.log(currentcode);
					//页面验证码生成
					$('#usernamelogin #userlogcode').text(currentcode); //生成随机验证码
				}
			} else {
				$('#lg_code').focus();
			}
		});

		//手机验证码登录
		$('#sendphonecode').click(function() { //手机验证码发送
			var phone = $('#phonenumber').val().trim();
			if(phone && $('#phone_code').val()) { //输入手机号与验证码后
				//点击请求手机验证码
				if(checkCode($('#phone_code').val().trim(), currentcode)) {
					console.log('phologcode正确');
					//生成手机验证码
					$.ajax({
						type: "post",
						url: "../api/query.php",
						data: "action=login&phone=" + phone,
						async: true,
						success: function(str) {
							if(str == 'yes') {
								cookie.set('username', phone, {
									path: '/'
								});
								phonecode = randomCode(4);
								$('#login #logphonecode').text(phonecode); //手机验证码显示
							} else {
								alert('手机号码有误');
							}
						}
					});
				} else {
					console.log('验证码不正确');
					$('#phone_code').val('');
					$('#phone_code').focus();
					currentcode = randomCode(4); //存当前验证码
					//页面验证码生成
					console.log($('#phonelogin #phonelogcode'));
					$('#phonelogin #phonelogcode').text(currentcode); //生成随机验证码
				}
			} else {
				$('#phone_code').focus();
			}
		});
		$('#phonedlbutton').click(function() { //手机号登录
			if($('#login #logphonecode').text()) {
				console.log('生成了phonecode');
				if(checkCode($('#loginputcode').val(), phonecode)) { //手机验证码匹配，登录成功
					console.log('phonecode正确');
					location.href = '../1.html';
				} else {
					console.log('phonecode不正确');
					alert('请点击[发送手机验证码]按钮重新发送手机验证码');
					$('#loginputcode').val('');
					$('#loginputcode').focus();
				}
			} else {
				$('#regphoneiuputcode').focus();
			}
		});
	} else if(str == '注册') {
		//登录的盒子隐藏，注册的盒子显示,更改标题按钮名
		$('#atextactive').text('登录');
		$('#login').css('display', 'none');
		$('#register').css('display', 'block');
		currentcode = randomCode(4); //存当前验证码
		//页面验证码生成
		$('#register #regcode').text(currentcode); //生成随机验证码

		$('#regphonesendcode').click(function() { //手机验证码发送
			var phonenumber = $('#regphonenumber').val().trim();
			//注册手机号码正则验证
			if(regCheck('手机号', phonenumber) && $('#reg_code').val()) { //输入手机号与验证码后
				//点击请求手机验证码
				if(checkCode($('#reg_code').val(), currentcode)) {
					console.log('code正确');
					//生成手机验证码
					phonecode = randomCode(6);
					$('#register #phoneregcode').text(phonecode);
				} else {
					$('#reg_code').focus();
				}
			} else {
				$('#reg_code').focus();
			}
		});
		$('#nextbutton').click(function() {
			if($('#register #phoneregcode').text()) {
				console.log('生成了phonecode');
				if(checkCode($('#regphoneiuputcode').val(), phonecode)) {
					$('#registerprev').fadeOut();
					$('#registernext').css('display', 'block');
					//输入用户名密码名
					$('#regusername').val(randomCode(6));
					$('#regpassword').val(randomCode(6));
				}
			} else {
				$('#regphoneiuputcode').focus();
			}
		});
		$('#sumitbutton').click(function() {
			var email = $('#regemail').val().trim();
			if(regCheck('邮箱', email)) {
				//调用接口把数据写进数据库
				var phone = $('#regphonenumber').val().trim();
				var name = $('#regusername').val().trim();
				var psw = $('#regpassword').val().trim();
				$.ajax({
					type: "post",
					url: "../api/query.php",
					data: "action=reg&phone=" + phone + '&name=' + name + '&psw=' + psw + '&email=' + email,
					async: true,
					success: function(str) {
						if(str == 'yes') {
							cookie.set('username', phone, {
								path: '/'
							});
							location.href = '../1.html';
						} else {
							alert('注册失败');
						}
					}
				});
			} else {
				$('#regemail').focus();
			}
		});
	}

	$('#atextactive').click(function() {
		location.href = 'login.html?' + 'loginway=' + $(this).text();
	});
});