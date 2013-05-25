<?php

	$title = 'Zander Martineau';
	$pageName = 'home';
	include_once 'includes/html_start.php';

?>
	<body>

		<?php
			include_once 'includes/masthead.php';
		?>

		<!--  === MAIN CONTENT ===  -->
		<section id="main" role="main">

		</section>


	<!-- =================  -->
	<!-- === TEMPLATES ===  -->
	<!-- =================  -->

	<!-- === Home / Project listing === -->
	<script id="home-tpl" type="text/x-handlebars-template">
		{{#portfolio}}
			<article id="{{meta.name}}" class="portfolio-pieces--item item-{{@index}} type-{{meta.type}} layout-{{meta.layout}}">
				<div class="inner-wrap">
					<div class="portfolio-pieces--item--inner group">
						<h1 class="portfolio-pieces--item--inner--title">{{name}}</h1>
						<p class="portfolio-pieces--item--inner--site-url text-centre">{{#if view.url}}<a href="{{view.url}}">{{view.name}}</a>{{else}}{{view.name}}{{/if}}</p>

						<section class="portfolio-pieces--item--description">
							{{{description}}}

							{{#if github}}
								<div class="github-details">
									<iframe src="http://ghbtns.com/github-btn.html?user={{github.user}}&repo={{github.repo}}&type=watch&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="150" height="30"></iframe>
									<iframe src="http://ghbtns.com/github-btn.html?user={{github.user}}&repo={{github.repo}}&type=fork&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="150" height="30"></iframe>
								</div>
							{{/if}}
						</section>

						<section class="portfolio-pieces--item--info">
							<ul>
								<!--<li><b>View:</b> <div>{{#if view.url}}<a href="{{view.url}}">{{view.name}}</a>{{else}}{{view.name}}{{/if}}</div></li>-->
								<li><b>Date:</b> <div>{{date}}</div></li>
								<li><b>Skills:</b> <div>{{skills}}</div></li>
								{{#credits}}
									<li><b>{{title}}:</b> <div>{{#if url}}<a href="{{url}}" title="{{name}}">{{name}}</a>{{else}}{{name}}{{/if}}</div></li>
								{{/credits}}
							</ul>
						</section>

					</div>

					<section class="portfolio-pieces--item--shots">
						{{#images}}
							<figure class="shot-{{@index}} shot-visible{{#if shot}} {{shot}}-shot{{/if}}" data-index="{{@index}}">
								<img src="/img/projects/{{../meta.name}}/{{url}}" alt="{{caption}}">
							</figure>
						{{/images}}
					</section>
				</div>
			</article>
		{{/portfolio}}
	</script>

<?php
	include_once 'includes/html_end.php';
?>