<?php

/*
 * helper_trimFileList
 * takes a list of files, and takes out any directories
 */
function helper_trimFileList($fileList, $rootDir = '')
{
  $fullDirPath = (!empty($rootDir)) ? $rootDir . '/' : '';
  foreach($fileList as $file)
  {
    
    if(is_dir($fullDirPath . $file) )
    {
      $key = array_search($file, $fileList);
      array_splice($fileList, $key, 1);
    }
  }
  return $fileList;
}

function helper_trimDirList($dirList, $rootDir = '')
{
  $fullDirPath = (!empty($rootDir)) ? $rootDir . '/' : '';
  foreach($dirList as $dir)
  {
    
    if(is_dir($fullDirPath . $dir) )
    {
      $key = array_search($dir, $dirList);
      array_splice($dirList, $key, 1);
    }
  }
  return $dirList;
}

/*
 * helper_addSpaces
 * takes some text, and adds the specified number of spaces to the beginning of it
 */
function helper_addSpaces($text, $numOfSpaces)
{
  if($numOfSpaces <= 0) { return $text; }
  for($i=0; $i < $numOfSpaces; $i++)
  {
    $text = ' ' . $text;
  }
  return $text;
}
?>