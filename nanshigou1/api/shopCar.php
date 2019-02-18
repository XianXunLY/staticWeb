<?php
	//获取详情页传过来的商品id
	$goodId = isset($_POST['goodId']) ? $_POST['goodId'] : 5;
	$buyername = isset($_POST['buyername']) ? $_POST['buyername'] : 1;
	$num = isset($_POST['num']) ? $_POST['num'] : 1;
	//总需求：通过id查商品数据并写入订单页
	
	//连接数据库
	include 'connect.php';
	//写sql通过buyerid查找商品信息表goodmessage数据
	$sql="SELECT * FROM goodmessage WHERE `goodId`='$goodId'";
	
	$seachres=$conn->query($sql);//通过connect.php文件中  定义的$conn数据库对象  访问数据库运行sql语句
	
	$res1=$seachres->fetch_all(MYSQLI_ASSOC);//处理结果集，等到一个数组
	var_dump($res1);//输出查询商品的信息
	
	//数组里边是商品对象信息，通过键名取键值
	$goodname = $res1[0]['goodname'];
//	echo $goodName;//商品名
	$price = $res1[0]['shopprice'];
//	echo $price;//价格
	$img = $res1[0]['img'];
//	echo $img;//商品图
	$storename = $res1[0]['storename'];
//	echo $seller;//商家名
	$address = $res1[0]['address'];
//	echo $address;//商家地址
	
	
	//写sql语句把信息插入订单页orders
	$sql2="INSERT INTO orders (buyername,goodId,goodname,price,img,storename,address,num) VALUES('$buyername','$goodId','$goodname',$price,'$img','$storename','$address','$num')";
//	$sql2="INSERT INTO orders (buyername,goodId,goodname,price,img,storename,address,num) VALUES('1','1','iphone',2000,'2.jpg','003','香港',2)";
	$insertres = $conn->query($sql2);//执行
	
	if($insertres)
		echo 'yes';//信息添加成功，商品订单已加入shopcar
	else
		echo 'no';//商品订单未成功加入shopcar
	
?>