<?php

	$title = 'Zander Martineau';
	$pageName = '404';
	include_once 'includes/html_start.php';

?>
	<body>

		<?php
			include_once 'includes/masthead.php';
		?>

		<!--  === MAIN CONTENT ===  -->
		<section id="main" role="main" class="text-centre">
			<h1>Ooops.. </h1>
			<h2>This page does not exist</h2>
			<h3><a href="/">Click here to return to the home page</a></h3>

			<form action="http://google.com/search" method="get" class="site-search">
				<fieldset role="search">
					<input type="hidden" name="q" value="site:martineau.tv">
					<input class="site-search-input" type="search" name="q" results="0" placeholder="Search" accesskey="/">
				</fieldset>
			</form>
		</section>

<?php
	include_once 'includes/html_end.php';
?>