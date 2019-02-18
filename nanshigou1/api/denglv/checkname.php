<?php
	$name = isset($_POST['name']) ? $_POST['name'] : '111';
	
	//构建sql语句，查找当前注册用户名的数据
	$sql="SELECT * FROM user_inf WHERE `name`='$name'";
	
	include 'connect.php';
	
	$res = $conn->query($sql);
	
	if($res->num_rows==0){//不存在相同的数据
		echo 'yes';
//		var_dump($res);
	}else{
		echo 'no';
//		var_dump($res);
	}
	
	$conn->close();
?>