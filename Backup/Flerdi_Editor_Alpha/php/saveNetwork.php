<?php 
if (empty($_POST['fileName']) || empty($_POST['content'])) {
	exit;
}
$fileName = $_POST['fileName'];
$content = $_POST['content'];
$file_handle = fopen($fileName, 'w');
fwrite($file_handle, $content);
fclose($file_handle);
?>