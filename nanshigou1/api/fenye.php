<?php
	$qty = isset($_POST['qty']) ? $_POST['qty'] : 5;//列表页条数
	$page = isset($_POST['page']) ? $_POST['page'] : 1;//当前页数
	
	$start=($page-1)*$qty;
	//构建sql语句
	$sql="SELECT * FROM goodmessage limit $start,$qty";//************************************************
	
	include 'connect.php';//相当于把链接文件的代码复制过来

	$res1=$conn->query($sql);//通过connect.php文件中  定义的$conn数据库对象  访问数据库运行sql语句
	
	$sql11="SELECT * FROM goodmessage";//************************************************
	
	$res11=$conn->query($sql11);//通过connect.php文件中  定义的$conn数据库对象  访问数据库运行sql语句
	
	$total=$res11->num_rows;
//	var_dump($res1);
	$res2=$res1->fetch_all(MYSQLI_ASSOC);
//	var_dump($res2);
	$res3=array(
		'page'=>$page,
		'qty'=>$qty,
		'datalist'=>$res2,
		'total'=>$total
	);
	$res=json_encode($res3,JSON_UNESCAPED_UNICODE);
	echo $res;
	$res1->close();
	$res11->close();
	$conn->close();
?>