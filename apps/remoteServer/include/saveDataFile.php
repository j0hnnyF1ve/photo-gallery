<?php
function saveDataFile($data, $filepath) {
	$name = basename($filepath);
	$parentDir = dirname($filepath);

	$xml = new SimpleXMLElement('<xml/>');
	$numRows = count($data);
	$numColumns = (!empty($data[0]) ) ? count($data[0]) : '';

	$count = 0;
	// reverse order because the bottommost displayed element are the 1st ones
//	for($i=0; $i < $numRows; $i++)
	for($i=$numRows - 1; $i >= 0; $i--)
	{
		$row = $xml->addChild('row');
		for($j=0; $j < $numColumns; $j++)
		{
			$file = $row->addChild('file');
			$obj = $data[$i][$j]; 

			if(!empty($obj) && !empty($obj['path']) ) 
			{
				$imgPath = $obj['path'];
				$file->addChild('path', $imgPath);
			} 
			$count++;
		}	
	}
	header('Content-type: text/xml');
	print($xml->asXML());

	$fp = fopen($filepath, 'w');
	fwrite($fp, $xml->asXML() );
	fclose($fp);
}
?>