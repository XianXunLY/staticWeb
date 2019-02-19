$(function (){
	$('#logo_ul1 li:last').css({
		"display": "none"
	});
	$('#logo_ul1').on('mouseover', 'li:first', function () {
		$(this).next().fadeIn(100, 'swing', function () {
			$(this).children('li i').removeClass('rotatei');
			$(this).click(function () {
				//				console.log($(this).prev());
				$(this).prev().children().eq(0).removeClass('currenti');
				$(this).prev().clone(true).appendTo($(this).parent());
				$(this).prev().remove();
				$(this).children().eq(0).addClass('currenti');
				$('#logo_ul1 li:last').css({
					"display": "none"
				});
				updateInput();
			});
			$('#logo_ul1').mouseleave(function () {
				$('#logo_ul1 li:last').css({
					"display": "none"
				});
			});
		});
	});
	function updateInput() {
		var str = '请输入你要搜索的' + $('#logo_ul1').children('li:first').text() + '关键字';
		$('#inp1').prop('placeholder', str);
		$('#inp1').focus();
		//更新搜索热度的标题内容
	}
});