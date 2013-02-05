<?php 
//error catch
if (empty($_POST['content'])) {
	exit;
}
$root = $_SERVER['DOCUMENT_ROOT'];
$content = $_POST['content'];
$fileName = $root.'/test_files/lastSave.yaml';
$file_handle = fopen($fileName, 'w');
fwrite($file_handle, $content);
fclose($file_handle);
?>