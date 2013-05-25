<?php

	$title = 'Zander Martineau\'s Open Source contributions';
	$pageName = 'open-source';
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

	<!-- === Code ===  -->
	<script id="open-source-tpl" type="text/x-handlebars-template">
		<div class="hero-unit">
			<div class="hero-unit--inner">
				<h2w>{{open-source.title}}</h2w>
				<p>{{{open-source.description}}}</p>
			</div>
		</div>

		{{#open-source.items}}
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
								<!--<li><b>View:</b> <div>{{#if view.url}}<a href="{{view.url}}">{{view.name}}</a>{{else}}{{view.name}}{{/if}}</div></li>-->
								<li><b>Date:</b> <div>{{date}}</div></li>
								<li><b>Skills:</b> <div>{{skills}}</div></li>
								{{#credits}}
									<li><b>{{title}}:</b> <div>{{#if url}}<a href="{{url}}" title="{{name}}">{{name}}</a>{{else}}{{name}}{{/if}}</div></li>
								{{/credits}}

								{{#if github}}
									<li><div><iframe src="http://ghbtns.com/github-btn.html?user={{github.user}}&repo={{github.repo}}&type=watch&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="150" height="30"></iframe></div></li>
									<li><div><iframe src="http://ghbtns.com/github-btn.html?user={{github.user}}&repo={{github.repo}}&type=fork&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="150" height="30"></iframe></div></li>
								{{/if}}
							</ul>
						</section>

					</div>

					<section class="portfolio-pieces--item--shots group">
						{{#images}}
							<figure {{#if shot}} class="{{shot}}-shot"{{/if}}>
								<img src="/img/projects/{{../meta.name}}/{{url}}" alt="{{caption}}">
							</figure>
						{{/images}}
					</section>
				</div>
			</article>
		{{/open-source.items}}
	</script>

<?php
	include_once '../includes/html_end.php';
?>