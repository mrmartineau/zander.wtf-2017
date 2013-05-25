<?php

	$title = 'Zander Martineau\'s Sublime Text resources';
	$pageName = 'sublime';
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

	<!-- === Sublime Text ===  -->
	<script id="sublime-tpl" type="text/x-handlebars-template">
		<div class="hero-unit">
			<div class="hero-unit--inner">
				<h2>{{sublime.title}}</h2>
				{{{sublime.description}}}
			</div>
		</div>

		{{#sublime.items}}
			<article id="{{meta.name}}" class="portfolio-pieces--item item-{{@index}} type-{{meta.type}} layout-{{meta.layout}}">
				<div class="inner-wrap">
					<div class="portfolio-pieces--item--inner group">
						<h1 class="portfolio-pieces--item--inner--title">{{name}}</h1>
						<p class="portfolio-pieces--item--inner--site-url text-centre">{{#if view.url}}<a href="{{view.url}}">{{view.name}}</a>{{else}}{{view.name}}{{/if}}</p>

						<section class="portfolio-pieces--item--description">
							{{{description}}}
						</section>

						<section class="portfolio-pieces--item--info">
							<ul>
								<li><iframe src="http://ghbtns.com/github-btn.html?user={{github.user}}&repo={{github.repo}}&type=watch&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="150" height="30"></iframe></li>
								<li><iframe src="http://ghbtns.com/github-btn.html?user={{github.user}}&repo={{github.repo}}&type=fork&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="150" height="30"></iframe></li>
							</ul>
						</section>

					</div>
				</div>
			</article>
		{{/sublime.items}}
	</script>

<?php
	include_once '../includes/html_end.php';
?>