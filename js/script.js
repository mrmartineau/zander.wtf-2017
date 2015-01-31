/**
 * Author: Zander Martineau
 */
;(function() {
	document.addEventListener('DOMContentLoaded', function() {
		trak.start();

		var swiftclick = SwiftClick.attach(document.body);
		var navBtn     = document.querySelector('.navBtn');
		var commentsToggleBtn = document.querySelector('.loadComments');
		var disqusEl          = document.querySelector('#disqus_thread');

		navBtn.addEventListener('click', function(e) {
			e.preventDefault();
			if (document.body.classList.contains('is-nav-active')) {
				document.body.classList.remove('is-nav-active');
			} else {
				document.body.classList.add('is-nav-active');
				trak.event('Navigation', 'Click', 'Open nav');
			}
		});

		scrollConverter.activate();


		commentsToggleBtn.addEventListener('click', toggleComments);

		function toggleComments(e) {
			e.preventDefault();
			commentsToggleBtn.classList.toggle('is-hidden');
			disqusEl.classList.toggle('is-hidden');
			loadJS('//' + disqus_shortname + '.disqus.com/embed.js', viewComments);
		}

		function viewComments() {
			console.log("scroll me down", window.scrollY);
		}

		function loadJS( src, cb ){
			"use strict";
			var ref = window.document.getElementsByTagName( "script" )[ 0 ];
			var script = window.document.createElement( "script" );
			script.src = src;
			script.async = true;
			ref.parentNode.insertBefore( script, ref );
			if (cb && typeof(cb) === "function") {
				script.onload = cb;
			}
			return script;
		}

	});

})();
