var trak = require('trak.js');

function navigation() {
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
}

module.exports = navigation;
