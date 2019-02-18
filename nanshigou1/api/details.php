<?php
	$id = isset($_POST['id']) ? $_POST['id'] : 1;//列表页点击查看详情的商品id
	
	$sql="SELECT * FROM goodmessage WHERE `goodId`='$id'";
	
	
	include 'connect.php';//相当于把链接文件的代码复制过来
	
	$res1=$conn->query($sql);//通过connect.php文件中  定义的$conn数据库对象  访问数据库运行sql语句
	
	
	$res2=$res1->fetch_all(MYSQLI_ASSOC);
	$res=json_encode($res2,JSON_UNESCAPED_UNICODE);
	
	echo $res;
	$res1->close();
	$conn->close();
?>