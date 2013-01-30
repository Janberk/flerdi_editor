<?php 
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=exported.yaml");
$root = $_SERVER['DOCUMENT_ROOT'];
$fileName = $root.'/test_files/exported.yaml';
$file_handle = fopen($fileName, 'r');
while (!feof($file_handle)) {
    $buffer = fgets($file_handle);
    echo $buffer;
}
fclose($file_handle);
?>