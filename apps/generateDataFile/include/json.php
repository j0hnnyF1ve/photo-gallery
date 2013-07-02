<?php
// take a linear gallery, and turn it into a multi-dimensional json object
function generateJson($name, $gallery, $parentDir, $numColumns) 
{
	$info = array();
	$galleryCount = count($gallery);
	$numRows = $galleryCount / $numColumns;

	$count = 0;
	for($i=0; $i < $numRows; $i++)
	{
		$row = array();
		for($j=0; $j < $numColumns; $j++)
		{
			if($count < $galleryCount) 
			{ 
				$imgPath = $gallery[$count];
				array_push($row, array('path' => $parentDir . '/' . $imgPath) );
			}
			else {
				array_push($row, array() );
			}
			$count++;
		}
		array_push($info, $row);
	}

	$json = json_encode($info);

	$fp = fopen($name . '.js', 'w');
	fwrite($fp, $json );
	fclose($fp);	

	return $json;
}
?>