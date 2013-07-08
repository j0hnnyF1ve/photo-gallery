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
					<button id="ReloadButton">Reload</button>
				</nav>
				<div id="Message"></div>
			</h1>
			<div id="Editor"></div>
		</div>

<?php echo $scriptHtml; ?>

		<script type="text/javascript">
			// initialize some basic variables, these should always reflect the current state of the application
			var GLOBAL = {};
			GLOBAL.filename = '<?php echo $filename; ?>';
			GLOBAL.path = '<?php echo $path; ?>';
			GLOBAL.galleryName = '<?php echo $galleryName; ?>';
		</script>
	</body>
</html>