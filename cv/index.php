<?php

	$title = 'Zander Martineau\'s CV';
	$pageName = 'cv';
	include_once '../includes/html_start.php';

?>
	<body>

		<?php
			include_once '../includes/masthead.php';
		?>

		<!--  === MAIN CONTENT ===  -->
		<section id="main" role="main">

		</section>


	<!-- =================  -->
	<!-- === TEMPLATES ===  -->
	<!-- =================  -->
	<!-- === CV ===  -->
	<script id="cv-tpl" type="text/x-handlebars-template">
		<div class="portfolio-pieces--item--inner group">
			<h2>{{title}}</h2>
		</div>
		{{#experience}}
			<article>
				<div class="portfolio-pieces--item--inner group">
					<h2><a href="{{url}}" title="{{name}}">{{name}}</a></h2>
					<time datetime="2011-01-12">{{date}}</time>
					<ul>
						{{#projects}}
							<li>
								<h3>{{name}}</h3>
								<a href="{{url}}" title="{{name}}">{{url}}</a>
								<time datetime="2011-01-12">{{time}}</time>
								<div>
									{{description}}
								</div>
							</li>
						{{/projects}}
					</ul>
				</div>
			</article>
		{{/experience}}
	</script>

<?php
	include_once '../includes/html_end.php';
?>