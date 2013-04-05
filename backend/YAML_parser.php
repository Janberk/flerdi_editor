<?php

require_once "../lib/spyc.php";

$type = isset($_POST['type']) ? $_POST['type'] : false;
$source = isset($_POST['source']) ? $_POST['source'] : false;

if( ! $type or ! $source) {
	echo json_encode(array('succes' => 'fail'));
	exit ;
}
echo $source;
//echo parse($source, $type);

/**
 * This function parse a text representation of a Network to a JSON-representation of the Network
 *
 * @param network text representation of the network
 *
 * @return JSON representation of the network
 */
function parse($network, $type) {
	$lines = "";
	if($type == 'text') {
		$name = time();
		file_put_contents($name, $network);
		$lines = file($name);
		unlink($name);
	} else {
		$lines = file('../'.$network);
	}

	for($i = 0; $i < count($lines); $i++) {
		if(trim($lines[$i]) == "- !yaml.org,2002:NetworkElement") {
			$lines[$i] = " ".$lines[$i]."\n";
		}
		if(trim($lines[$i]) == "- !yaml.org,2002:NetworkInterface") {
			$lines[$i] = " ".$lines[$i]."\n";
		}
		if(trim($lines[$i]) == "- !yaml.org,2002:Resource") {
			$lines[$i] = " ".$lines[$i]."\n";
		}
		if(trim($lines[$i]) == "- !yaml.org,2002:Feature") {
			$lines[$i] = " ".$lines[$i]."\n";
		}
	}

	$yaml = implode("", $lines);
	$yaml = str_replace("attributes", " attributes", $yaml);

	return $yaml;

	//return json_encode(spyc_load($yaml));
}
?>