<?php 
//error catch
if (empty($_POST['fileName']) || empty($_POST['content'])) {
	exit;
}
$root = $_SERVER['DOCUMENT_ROOT'];
$yaml = $_POST['content'];
$fileName = $root.'/test_files/'.$_POST['fileName'];
$file_handle = fopen($fileName, 'w');
fwrite($file_handle, $yaml);
fclose($file_handle);
?>