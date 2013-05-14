<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title></title>
		<meta name="description" content="">

		<!-- Mobile viewport optimized: h5bp.com/viewport -->
		<meta name="viewport" content="width=device-width">

		<link rel="stylesheet" href="css/kickoff.css">
		<script type="text/javascript" src="//use.typekit.net/zsa7ozf.js"></script>
		<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
		<script src="js/libs/modernizr.min.js"></script>

		<style id="custom-styles"></style>
	</head>
	<body>

		<nav class="navvy-container">
			<a href="/#/portfolio" title="Work">Work</a>
			<div class="navvy">
				<b></b>
				<i></i>
				<b></b>
			</div>
			<a href="/blog" title="Blog">Blog</a>
		</nav>

		<header class="masthead">
			<h1><a href="#/home">Zander Martineau</a></h1>
			<p>I am a London-based Creative Technologist working at <a href=\"http://tmw.co.uk\">TMW</a></p>
			<footer id="footer" role="contentinfo">
				<div class="personal-links">
					<div class="icon-links personal-links">
						<a href="http://github.com/MrMartineau" title="github" class="personal-links--github"></a><a href="http://twitter.com/MrMartineau" title="twitter" class="personal-links--twitter"></a><a href="http://instagram.com/MrMartineau" title="instagram" class="personal-links--instagram"></a><a href="http://dribbble.com/MrMartineau" title="dribbble" class="personal-links--dribbble"></a><a href="http://mrmartineau.tumblr.com/" title="tumblr" class="personal-links--tumblr"></a><a href="https://pinboard.in/u:mrmartineau" title="pinboard" class="personal-links--pinboard"></a>
					</div>
				</div>
			</footer>
		</header>

		<!--  === MAIN CONTENT ===  -->
		<section id="main" role="main">

		</section>


		<!-- <nav> -->
			<!-- <a href="#/projects">Projects</a> / <a href="#/about">About</a> / <a href="#/projects/logos">Logos</a> / <a href="http://mrmartineau.co.uk">Social</a> / <a href="http://rathersplendid.net">Blog</a> -->
			<!-- </nav> -->






	<!-- =================  -->
	<!-- === TEMPLATES ===  -->
	<!-- =================  -->

	<!-- === Navigation ===  -->
	<script id="navigation-tpl" type="text/x-handlebars-template">
		{{#info.navigation_links}}<a href="{{url}}" title="{{name}}">{{{name}}}</a>{{/info.navigation_links}}
	</script>


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
							<figure class="shot-hidden-{{@index}} shot-hidden is-invisible">
								<img src="/img/projects/{{../meta.name}}/{{url}}" alt="{{caption}}">
							</figure>
						{{/images}}

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


	<!-- === Code ===  -->
	<script id="code-tpl" type="text/x-handlebars-template">
		<div class="hero-unit">
			<div class="hero-unit--inner">
				<h1>{{code.title}}</h1>
				<p>{{{code.description}}}</p>
			</div>
		</div>

		{{#code.items}}
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
		{{/code.items}}
	</script>

	<script id="project-item-header-tpl" type="text/x-handlebars-template">
		<a href="" title="Previous">Previous</a>
		<a href="#/home" title="Home">Home</a>
		<a href="" title="Next">Next</a>
	</script>


	<!-- === Project item ===  -->
	<script id="project-item-tpl" type="text/x-handlebars-template">
		<article id="{{meta.name}}" class="portfolio-pieces--item item-{{@index}} type-{{meta.type}} layout-{{meta.layout}}">
			<div class="inner-wrap">
				<div class="portfolio-pieces--item--inner group">
					<h1>{{name}}</h1>

					<section class="portfolio-pieces--item--description">
						{{{description}}}
					</section>

					<section class="portfolio-pieces--item--info">
						<ul>
							<li><b>View:</b> {{#if view.url}} <a href="{{view.url}}">{{view.name}}</a>{{else}}{{view.name}}{{/if}}</li>
							<li><b>Date:</b> {{date}}</li>
							<li><b>Skills:</b> {{skills}}</li>
							{{#credits}}
								<li><b>{{title}}:</b> {{#if url}}<a href="{{url}}" title="{{name}}">{{name}}</a>{{else}}{{name}}{{/if}}</li>
							{{/credits}}
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
	</script>


	<!-- === About ===  -->
	<script id="about-tpl" type="text/x-handlebars-template">
		<article>
			<div class="portfolio-pieces--item--inner group">
				<h1>{{about.title}}</h1>
				{{about.copy}}
			</div>
		</article>
	</script>


	<!-- === Sublime Text ===  -->
	<script id="sublime-tpl" type="text/x-handlebars-template">
		<div class="hero-unit">
			<div class="hero-unit--inner">
				<h1>{{sublime.title}}</h1>
				{{sublime.description}}
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


	<!-- === Footer ===  -->
	<script id="footer-tpl" type="text/x-handlebars-template">
		<div class="icon-links personal-links">
			{{#footer_links}}<a href="{{url}}" title="{{name}}" class="personal-links--{{name}}">{{{char}}}</a>{{/footer_links}}
		</div>
	</script>


	<!-- === CV ===  -->
	<script id="cv-tpl" type="text/x-handlebars-template">
		<div class="portfolio-pieces--item--inner group">
			<h1>{{title}}</h2>
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

	<!-- === Portfolio CSS compilation ===  -->
	<script id="custom-styles-tpl" type="text/x-handlebars-template">
		{{#portfolio}}
			#{{meta.name}}.portfolio-pieces--item {
				background-color: {{meta.colours.bg}};
				color: {{meta.colours.text}};
			}

			#{{meta.name}}.portfolio-pieces--item h1 {
				color: {{meta.colours.text}};
			}

			#{{meta.name}}.portfolio-pieces--item a {
				color: {{meta.colours.link}};
			}

			#{{meta.name}}.portfolio-pieces--item a:hover {
				color: {{meta.colours.linkHover}};
			}
		{{/portfolio}}
	</script>




	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/libs/jquery.min.js"><\/script>')</script>
	<script src="/js/_compiled/_script.min.js"></script>

</body>
</html>