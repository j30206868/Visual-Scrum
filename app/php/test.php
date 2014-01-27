<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>無標題文件</title>
<!-- jquery lib -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
	$.ajax({
	type: 'POST',
	url:"DBController.php",
	data:{
		uid:'u9923024',
		upass:'1234'
	},
	success: function(data){
		alert(data);
	}
});
});
</script>
</head>

<body>

<script>


</script>

</body>
</html>