<?php
require_once "../lib/spyc.php";

file_put_contents ( 'temp',$_POST['text']);

$zeilen = file ('temp');

for ($i=0;$i<count($zeilen);$i++) {
	if(trim($zeilen[$i]) == "- !yaml.org,2002:NetworkElement"){
		$zeilen[$i] = " ".$zeilen[$i]."\n";
	}
	if(trim($zeilen[$i]) == "- !yaml.org,2002:NetworkInterface"){
		$zeilen[$i] = " ".$zeilen[$i]."\n";
	}
	if(trim($zeilen[$i]) == "- !yaml.org,2002:Resource"){
		$zeilen[$i] = " ".$zeilen[$i]."\n";
	}
	if(trim($zeilen[$i]) == "- !yaml.org,2002:Feature"){
		$zeilen[$i] = " ".$zeilen[$i]."\n";
	}
}
$yaml = implode("",$zeilen);
$yaml = str_replace("attributes"," attributes",$yaml);
unlink('temp');
echo json_encode(spyc_load($yaml));

?>