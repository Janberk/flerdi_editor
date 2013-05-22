<?php
	$yaml = isset($_POST['content']) ? $_POST['content'] : false;
	$name = isset($_POST['name']) ? $_POST['name'] : false;
	
	if ( ! yaml || ! name) {
		exit ;
	}
	
	header('Content-Type: application/octet-stream');
	header('Content-Disposition: attachment; filename="'. basename($name). '.yaml"');
	ob_clean();
	echo $yaml;
?>