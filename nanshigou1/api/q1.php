<?php
	header("Content-Type: text/html; charset=utf-8");
	$assortment = isset($_POST['assortment']) ? $_POST['assortment'] : '上衣';
	//写好配置信息
	$servername='localhost';//主机名
	$username='root';//用户名
	$password='';//密码
	$dbname='myitem';//数据库名称
	
	//创建数据库连接
	$conn=new mysqli($servername,$username,$password,$dbname);
	// 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
    //查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
	
	$sql = "SELECT * FROM goodmessage WHERE `assortment`='$assortment' order by assess desc LIMIT 4";
	$res1 = $conn->query($sql);
	$res2 = $res1 -> fetch_all(MYSQLI_ASSOC);
		$res = json_encode($res2,JSON_UNESCAPED_UNICODE);
		echo $res;//根据商品id返回结果集
	$conn -> close();
		
?>