<?php

	$title = 'Cloze Test Generator by Zander Martineau';
	$pageName = 'cloze';
	$customCSS = 'css/style.css';
	include_once '../includes/html_start.php';

?>
<body>
	<div id="main" class="entry">
		<h1 class="text-centre">Cloze creator</h1>
		<div class="group">
			<h3>1. Paste in text</h3>
			<div id="placeholders" class="fr">
				<small>Placeholders:
				<a href="#" id="lorem" data-text="Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.">Lorem ipsum</a> /
				 <a href="#" id="kafka" data-text="One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.">Kafka</a> /
				 <a href="#" id="pangram" data-text="The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs!">Pangram</a>
				</small>
			</div>
		</div>
		<textarea id="input" class="input" autofocus></textarea>
		<div class="group">
			<div id="result">
				<h3>2. Click the words below that you want to hide</h3>
				<p><small>Click words only once</small></p>
				<!-- <button id="#select">Select all text below</button> -->
				<div id="result_content"></div>
			</div><!-- /results -->
			<div id="keywords">
				<h3>3. Keywords</h3>
				<p><small>Click again to remove from this list &amp; replace the words back into the main body of text.</small></p>
				<div id="keyword_content"></div>
				<button id="#random" class="btn">Randomise</button>
			</div><!-- /keywords -->
		</div>
		<footer>
			<p><a href="http://en.wikipedia.org/wiki/Cloze_test" title="Cloze Test info">Cloze Test info</a> | Built by <a href="http://martineau.tv/">Zander Martineau</a></p>
		</footer>
	</div><!--!/#container -->
<?php
	$customScript = 'js/script.js';
	include_once '../includes/html_end.php';
?>