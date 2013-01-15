<?php 
//lib import
include('../lib/spyc.php');

//error catch
if (empty($_POST['fileName']) || empty($_POST['content'])) {
	exit;
}

//yaml dumper
$content = $_POST['content'];
$yaml = Spyc::YAMLDump($content,false,0);

//to array
$test = explode("\n",$yaml);

//bunch of vars
$lineNumber = 0;
$tabs = 0;
$description = "";
$newSection = true;
$attrCount = 0;
$positionSection = false;
$newElement = false;
$elementCount = 0;

foreach($test as &$line) {
	//first line clear
	if ($lineNumber == 0) {
		$line = "";
	}
	
	//newElement check
	if (preg_match("/^  -/",$line) && !$positionSection) {
		$elementCount = $elementCount + 1;
		$newElement = true;
	}
	
	//trim line
	$line = trim($line);
	
	//tab management
	if ($line == "resources:" || $line == "features:") {
		$newElement = false;
		if ($tabs > 0) {
			$tabs = $tabs - 2;
		}
		if ($attrCount > 0) {
			if ($tabs > 0) {
				$tabs = $tabs - 2;
			}
		}
		$attrCount = 0;
		$newSection = true;
	} else if ($line == "attributes:" && $lineNumber != 2) {
		$tabs = $tabs + 2;
	} else if ($line == "network_elements:" ||($line == "-" && $newElement)) {
		$tabs = 0;
		$attrCount = 0;
		$newSection = true;			
	} else if ($line == "-" && $positionSection) {
		if ($tabs > 0) {
			$tabs = $tabs - 2;
		}
	} else if ($line == "-" && !$newSection) {
		if ($tabs > 2) {
			$tabs = $tabs - 4;
		}	
	} else if ($line == "--- !Flerdit,2012:") {
		$tabs = 0;
		$newSection = true;
	}
	
	//tab insert
	for ($i = 0; $i < $tabs; $i++) {
		$line = " ".$line;
	}
	
	//descriptions
	if (trim($line) == "attributes:") {
		$tabs = $tabs + 2;
		if (!$newElement) {
			$attrCount = $attrCount + 1;
		}
		$newSection = false;
	} else if (trim($line) == "-" && $positionSection) {
		$tabs = $tabs + 2;
		$line = " ".$line;
		if (!$newSection) {
			$line = "\n".$line;
		}	
		$newSection = false;
	} else if (trim($line) == "-") {
		if (!$newSection) {
			$line = "\n".$line;	
		} else if ($newElement) {
			if ($elementCount != 1) {
				$line = "\n".$line;	
			}
			$description = " !yaml.org,2002:NetworkElement ";
		}
		$line = $line.$description;
	} else if (trim($line) == "--- !yaml.org,2002:") {
		$line = $line."GraphLabel ";
	} else if (trim($line) == "network_elements:") {
		$line = "\n".$line;
		$description = " !yaml.org,2002:NetworkElement ";
	} else if (trim($line) == "features:") {
		$line = "\n".$line;
		$description = " !yaml.org,2002:Feature ";
	} else if (trim($line) == "resources:") {
		$line = "\n".$line;
		$description = " !yaml.org,2002:Resource ";
	} else if (trim($line) == "--- !Flerdit,2012:") {
		$line = "\n\n"."# Example position objects (used by Flerdit and ignored by the prototype)"."\n\n".$line."Position";
		$description = "";
		$positionSection = true;
	}
	
	//number in ""
	if (preg_match("/\:\ [0-9]+/",$line)) {
		$line = preg_replace("/(\:\ )(\d+)/",": \"$2\"",$line);
	}
	
	//space after :
	if (preg_match("/\:$/",$line)) {
		$line = $line." ";
	}
	
	//linebreaks
	if (trim($line) != "") {
		$line = $line."\n";
	}
	
	//lineNumber inc
	$lineNumber = $lineNumber + 1;	
}

//to string
$yaml = implode("",$test);

//write
$root = $_SERVER['DOCUMENT_ROOT'];
$fileName = $root.'/test_files/'.$_POST['fileName'];
$file_handle = fopen($fileName, 'w');
fwrite($file_handle, $yaml);
fclose($file_handle);
?>