<?php
	/*
	 * 从前端获取数据,
	 	* 非登录状态
	 		* 验证用户名是否可以注册   用户信息表  user_inf  查询是否存在注册的用户名，唯一标识
	 		* 注册   用户信息表  user_inf  用户名不存在才把注册信息写进表
	 		* 打开详情页   商品信息表  goodmessage  通过传商品id查询数据 
	 		* 推荐热度商品    操作订单表  orders   查询订单中前几个数量最高的商品，在通过商品名查找表goodmessage拿数据渲染
	 	* 登录状态
	 		* 加入购物车
	 		* 个人信息修改与查看
	 		* 购物车管理
	 		* 查看访问足迹
	 */
	//操作参数
	$action = isset($_POST['action']) ? $_POST['action'] : 'delete';
	
	//属性参数
	$name = isset($_POST['name']) ? $_POST['name'] : '111';
	$psw = isset($_POST['psw']) ? $_POST['psw'] : '111';
	$goodId = isset($_POST['goodId']) ? $_POST['goodId'] : 8;
	$assortment = isset($_POST['assortment']) ? $_POST['assortment'] : '上装';
	$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
	$email = isset($_POST['email']) ? $_POST['email'] : '';
	$buyername = isset($_POST['buyername']) ? $_POST['buyername'] : 'u3117';
	
	//运行sql语句要连接数据库，通过数据库对象来访问
	include 'connect.php';//相当于把链接文件的代码复制过来
	
	/*  index初始化 *******验证  表名  goodmessage
	 	action : init ,
	 	assortment : 要渲染的类别商品 ，选最好的前四个
	 	
	 	返回  ：商品数据结果集
	 * */
	if($action == 'init'){
		$sql = "SELECT * FROM goodmessage WHERE `assortment`='$assortment' order by sellnumber desc LIMIT 4";
		$res1 = $conn -> query($sql);
		$res2 = $res1 -> fetch_all(MYSQLI_ASSOC);
		$res = json_encode($res2,JSON_UNESCAPED_UNICODE);
		echo $res;//根据商品id返回结果集
	}
	
		
	/*  1 *******验证  表名  user_inf
	 	action : checkname ,
	 	name : 要验证的用户名 
	 	
	 	返回  ：boolean
	 * */
	if($action == 'checkname'){
		$sql = "SELECT * FROM user_inf WHERE `name`='$name'";
		$res = $conn -> query($sql);
		if($res -> num_rows == 0){//不存在相同的数据
			echo 'yes';
		}else{
			echo 'no';
		}
	}
	
	
	/* 2  *******注册  表名  user_inf
	 	action : reg ,
	 	phone : 要用到的手机号
	 	name : 要注册的用户名 ,
	 	psw : 要注册的密码 ,
	 	
	 	返回  ：boolean
	 * */
	if($action == 'reg'){
		$sql ="INSERT INTO user_inf(username,PASSWORD,phone,email) VALUES('$name','$psw','$phone','$email')";
		$res = $conn -> query($sql);
		if($res){
			echo 'yes';
		}else{
			echo 'no';
		}
	}
	
	
	/* 3  *******登录  表名  user_inf
	 	action : login ,
	 	name : 要登录的用户名 ,
	 	psw : 要登录的密码 ,
	 	
	 	返回  ：boolean  前台cookie写进用户名，表示登录状态
	 * */
	if($action == 'login'){
		//构建sql语句，查找当前用户名与密码的数据
		if($phone){
			$sql = "SELECT * FROM user_inf WHERE `phone`='$phone'";
			$res = $conn -> query($sql);
			if($res -> num_rows == 0){
				echo 'no';
			}else{
				echo 'yes';;
			}
		}else{
			$sql = "SELECT * FROM user_inf WHERE `username`='$name' AND `password`='$psw' ";
			$res = $conn -> query($sql);
			if($res -> num_rows == 0){
				echo 'no';
			}else{
				echo 'yes';;
			}
		}
		
		
	}
	
	
	/* 4  *******详情   表名  goodmessage
	 	action : details ,
	 	id : 要查看的商品id ,
	 	
	 	返回  ：商品信息表的信息集    前台渲染
	 * */
	if($action == 'detalis'){
		$sql = "SELECT * FROM goodmessage WHERE `goodId`='$goodId'";
		$res1 = $conn -> query($sql);
		$res2 = $res1 -> fetch_all(MYSQLI_ASSOC);
		$res = json_encode($res2,JSON_UNESCAPED_UNICODE);
		echo $res;//根据商品id返回结果集
	}
	
	
	/* 5  *******查询search   表名  goodmessage
	 	action : search ,
	 	assortment : 商品类别,
	 	condition : 条件  销量/价格/类别/店铺/地址/商品名
	 	qty ： 列表页条数
		page : 当前页数
		desc : 升降序
	 	[goodId : 要查询的商品id ,]    可有可无
	 	[num : 要查询的商品数量 ,]
	 	[address : 要查询的商品地址 ,]
	 	[...]  其它信息查询
	 	返回  ：商品信息表的信息集
	 * */
	if($action == 'search'){
		//获取参数condition
		$qty = isset($_POST['qty']) ? $_POST['qty'] : 2;
		$page = isset($_POST['page']) ? $_POST['page'] : 3;
		$condition = isset($_POST['condition']) ? $_POST['condition'] : '';
		$desc = isset($_POST['desc']) ? $_POST['desc'] : '';
		$start=($page-1)*$qty;//计算从第几条算起
		if($desc =='true'){
			$desc = 'desc';
		}else{
			$desc = '';
		}
		
		//当条件不同时构造不同的sql语句
		if($condition == '销量'){
			$term = "`sellnumber`";
		}else if($condition == '人气'){
			$term = "`sellnumber`";
		}else if($condition == '价格'){
			$term = "`shopprice`";
		}else{
			$term = "`goodId`";
		}
		$sql = "SELECT * FROM goodmessage WHERE `assortment`='$assortment' and goodTotal >0 order by ".$term." $desc limit $start,$qty";//符合条件的前几条数据
		$sql2 = "SELECT * FROM goodmessage WHERE `assortment`='$assortment' and goodTotal >0 order by ".$term;//查找所有符合条件的数据
		if($condition == '区间'){//价格区间查询
			$min = isset($_POST['min']) ? $_POST['min'] : '0';
			$max = isset($_POST['max']) ? $_POST['max'] : '150';
			$sql = "SELECT * FROM goodmessage WHERE `assortment`='$assortment' and goodTotal >0 and `shopprice` BETWEEN $min AND $max limit $start,$qty";
			$sql2 = "SELECT * FROM goodmessage WHERE `assortment`='$assortment' and goodTotal >0 and `shopprice` BETWEEN $min AND $max";
		}
		$res1 = $conn -> query($sql);//前几条数据集
		$res2 = $conn -> query($sql2);//符合的所有数据集
		$linumber = $res2->num_rows;//所有数据集个数
		$res11 = $res1->fetch_all(MYSQLI_ASSOC);
		$res3=array(
			'page'=>$page,
			'qty'=>$qty,
			'datalist'=>$res11,
			'pagemax'=>$linumber/$qty
		);
		$res = json_encode($res3,JSON_UNESCAPED_UNICODE);
		echo $res;//根据商品id返回结果集
	}
	
	
	/* 6  *******添加   添加新商品信息 goodmessage  添加新订单 orders
	 	action : add ,
	 	goodId : 要购买的商品goodId ,
	 	buyername : 买家名 username,
	 	num : 订单商品数量
	 	
	 	返回  ：商品信息表的信息集
	 * */
	if($action == 'add'){
		$num = isset($_POST['num']) ? $_POST['num'] : 1;
		$address = isset($_POST['address']) ? $_POST['address'] : '广州';

		//写sql通过buyerid查找商品信息表goodmessage数据
		$sql="SELECT * FROM goodmessage WHERE `goodId`='$goodId'";
		$seachres=$conn->query($sql);//通过connect.php文件中  定义的$conn数据库对象  访问数据库运行sql语句
		
		$res1=$seachres->fetch_all(MYSQLI_ASSOC);//处理结果集，等到一个数组
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
		$goodTotal = $res1[0]['goodTotal'];//商品数量
		
		//查询orders的数据，用户buyername和商品goodId都一样的话，存在相同订单，只增加数量，不用添加数据到orders
		$sql1 = "SELECT * FROM orders WHERE `buyername`='$buyername' and `goodId`='$goodId'";
		$orderres = $conn -> query($sql1);
		if($orderres -> num_rows == 0){//不存在符合条件的数据
			if($num <= $goodTotal){
				//写sql语句把信息插入订单页orders
				$sql2="INSERT INTO orders (buyername,goodId,goodname,price,img,storename,address,num) VALUES('$buyername','$goodId','$goodname',$price,'$img','$storename','$address','$num')";
				//$sql2="INSERT INTO orders (buyername,goodId,goodname,price,img,storename,address,num) VALUES('1','1','iphone',2000,'2.jpg','003','香港',2)";
				$insertres = $conn->query($sql2);//执行
				
				if($insertres)
					echo 'yes';//信息添加成功，商品订单已加入shopcar
				else
					echo 'no';//商品订单未成功加入shopcar
				
			}else{
			echo 'error1';//订单数量溢出
			}
		}else{
			//已存在相同的订单
			//获取原来订单商品数量的num
			$orderres2 = $orderres->fetch_all(MYSQLI_ASSOC);//处理结果集，等到一个数组
			$numself = $orderres2[0]['num'];
			$num = $num + $numself;//更新为新的总购买数
			if($num <= $goodTotal&&$num>0){
				//写sql语句把修改表orders中符合要求的数据
				$sql2="UPDATE orders set num='$num' WHERE `buyername`='$buyername' and `goodId`='$goodId'";
				//$sql2="INSERT INTO orders (buyername,goodId,goodname,price,img,storename,address,num) VALUES('1','1','iphone',2000,'2.jpg','003','香港',2)";
				$updateres = $conn->query($sql2);//执行
				if($updateres)
					echo 'yes';//信息修改成功，商品订单已加入shopcar
				else
					echo 'no';//商品订单未成功加入shopcar
			}else{
			echo 'error2';//商品数量为0或负数
			}
		}
	}
		
		
	
	/* 7  *******   查询订单表orders 数据渲染
	 	action : shopcar ,
	 	buyername : 买家名 username,
	 	
	 	返回  ：商品信息表的信息集
	 * */
	if($action == 'shopcar'){
//		echo $buyername;
		$sql = "SELECT * FROM orders WHERE `buyername`='$buyername' order by storename";
		$res1 = $conn -> query($sql);
		$res2 = $res1 -> fetch_all(MYSQLI_ASSOC);
		$res = json_encode($res2,JSON_UNESCAPED_UNICODE);
		echo $res;//根据用户名返回结果集
	}
	
	/* 8  *******   删除订单表orders 数据
	 	action : delete ,
	 	buyername : 买家名 username,
	 	goodId : 商品名 goodId,
	 	
	 	返回  ：商品信息表的信息集
	 * */
	if($action == 'delete'){
		$sql = "delete FROM orders WHERE `buyername`='$buyername' and `goodId`='$goodId'";
		$res1 = $conn -> query($sql);
		if($res1)
			echo 'yes';//信息添加成功，商品订单已加入shopcar
		else
			echo 'no';//商品订单未成功加入shopcar
	}
	
	//关闭数据库
//	echo 'test';
	$conn -> close();
?>