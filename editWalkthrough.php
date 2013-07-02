<!DOCTYPE html>
<?php require_once('apps/editWalkthrough/include/header.php'); ?>
<html>
	<head>
		<title>Edit Walkthrough</title>
	  <script type="text/javascript" src="js/jquery.js"></script>
	  <link rel="stylesheet" href="apps/editWalkthrough/css/main.css" />
	</head>
	<body>
		<div id="Content">
			<h1 id="EditTitle">
				<span>Edit</span>
				<nav>
					<button id="SaveButton">Save</button>
				</nav>
				<div></div>
			</h1>
			<div id="Editor"></div>
		</div>

	  <?php echo $scriptHtml; ?>
		<script type="text/javascript">
			
			var GLOBAL = {};
			// wrap in anonymous function to prevent namespace conflicts
			(function(){
			"use strict";

				GLOBAL.filename = '<?php echo $filename; ?>';

				$(function() { 
			    $(document)
			      .mouseover( UI.mouseOver )
			      .mouseout( UI.mouseOut )
			      .mousedown( UI.mouseDown )
			      .mousemove( UI.mouseMove )
			      .mouseup( UI.mouseUp );

			    $('#SaveButton').click( OpHandler.saveHandler )

					$.ajax({
						type: "POST",
						url: GLOBAL.filename,
						dataType: 'xml',
					}).done(OpHandler.loadHandler);

				});

			})();
			/* end script */
		</script>
	</body>
</html>