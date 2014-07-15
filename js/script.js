/*	Author: Zander Martineau
*/

// Create a closure to maintain scope of the '$' and KO (Kickoff)
;(function() {
	document.addEventListener('DOMContentLoaded', function() {
		trak();

		var navBtn = document.querySelector('.navBtn');

		navBtn.addEventListener('click', function(e) {
			e.preventDefault();
			if (document.body.classList.contains('is-nav-active')) {
				document.body.classList.remove('is-nav-active');
			} else {
				document.body.classList.add('is-nav-active');
				trak.event('Navigation', 'Click', 'Open nav');
			}
		});
	});

})();
