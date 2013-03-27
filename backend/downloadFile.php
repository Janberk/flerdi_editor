<?php 
//error catch
if (empty($_GET['exportName'])) {
	exit;
}
$root = $_SERVER['DOCUMENT_ROOT'];
$fileName = $root.'/test_files/lastSave.yaml';
header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=".$_GET['exportName'].'.yaml');
$file_handle = fopen($fileName, 'r');
while (!feof($file_handle)) {
    $buffer = fgets($file_handle);
    echo $buffer;
}
fclose($file_handle);
?>