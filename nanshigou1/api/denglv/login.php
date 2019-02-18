<?php
	//从前端获取数据用来登录
	$name = isset($_POST['name']) ? $_POST['name'] : 'linyi';
	$psw = isset($_POST['psw']) ? $_POST['psw'] : '111';
	
	//构建sql语句，查找当前用户名与密码的数据
	$sql="SELECT * FROM user_inf WHERE `name`='$name' AND `password`='$psw' ";
	
	include 'connect.php';
	
	$res = $conn->query($sql);
	
	if($res->num_rows==0){
		echo 'no';
//		var_dump($res);
	}else{
		echo 'yes';
//		var_dump($res);
	}
	
	$conn->close();
?>