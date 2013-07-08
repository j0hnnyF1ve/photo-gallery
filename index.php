<?php
/* APP NOTES
** index.php and the "page" folder are linked together
** Content from the "pages" folder must be called from index.php
*/
require_once('include/pageHeader.php');
// begin HTML declaration
?>
<!DOCTYPE HTML>
<html>
<head>
  <meta name="viewport" content="width=<?php echo $mobileDeviceWidth; ?>" />
  <title>A Road A Little Less Traveled</title>
  <link rel="stylesheet" href="css/main.css" />
<?php echo $pageCss; ?>
<?php echo $galleryCss; ?>
</head>

<body <?php echo $bodyClass; ?> >
  <div id="LoadScreen"></div>
  <div id="Lightbox"></div>
  <div id="Content">
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript">
    var GLOBAL = {}; // define the GLOBAL object, so we know what values in the program are global
  </script>
  <script type="text/javascript" src="js/loaders.js"></script>
<?php echo $scriptHtml; ?>
<?php echo $pageHtml; ?>
</div>
</body>
</html>
