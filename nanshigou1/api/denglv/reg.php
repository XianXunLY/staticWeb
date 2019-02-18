<?php
	//从前端获取数据用来注册
	$name = isset($_POST['name']) ? $_POST['name'] : '111';
	$psw = isset($_POST['psw']) ? $_POST['psw'] : '111';
	
	//构建sql语句
	$sql="INSERT INTO user_inf(NAME,PASSWORD) VALUES('$name','$psw')";
	
	//运行sql语句要连接数据库，通过数据库对象来访问
	include 'connect.php';//相当于把链接文件的代码复制过来
	
	$res = $conn->query($sql);//通过connect.php文件中  定义的$conn数据库对象  访问数据库运行sql语句
	
	if($res){
		echo 'yes';
	}else{
		echo 'no';
	}
	
	//关闭数据库
	$conn->close();
?>