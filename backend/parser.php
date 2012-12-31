<?php
require_once "../lib/spyc.php";

$file = $_POST['file'];

$zeilen = file ('../'.$file);

for ($i=0;$i<count($zeilen);$i++) {
	if(trim($zeilen[$i]) == "- !yaml.org,2002:NetworkElement"){
		$zeilen[$i] = " ".trim($zeilen[$i])."\n";
	}
}
$yaml = implode("",$zeilen);
$yaml = str_replace("attributes"," attributes",$yaml);

echo json_encode(spyc_load($yaml));
?>