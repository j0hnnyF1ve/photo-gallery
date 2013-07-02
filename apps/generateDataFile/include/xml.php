<?php
// take a linear gallery, and turn it into a multi-dimensional xml document
function generateXml($name, $gallery, $parentDir, $numColumns) 
{
	$xml = new SimpleXMLElement('<xml/>');
	$galleryCount = count($gallery);
	$numRows = $galleryCount / $numColumns;

	$count = 0;
	for($i=0; $i < $numRows; $i++)
	{
		$row = $xml->addChild('row');
		for($j=0; $j < $numColumns; $j++)
		{
			//if($count >= $galleryCount) { break; }

			$file = $row->addChild('file');
			if($count < $galleryCount) 
			{ 
				$imgPath = $gallery[$count]; 
				if(!empty($imgPath)) 
				{
					$file->addChild('path', $parentDir . '/' . $imgPath);
				}
			}
			// else, a blank file entry is added to the tree
			$count++;
		}	
	}
	$fp = fopen($name. '.xml', 'w');
	fwrite($fp, $xml->asXML() );
	fclose($fp);	

	return $xml->asXML();
}
?>