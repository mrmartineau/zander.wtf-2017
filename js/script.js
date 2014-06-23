/*	Author:
		TMW - (Author Name Here)
*/

// Create a closure to maintain scope of the '$' and KO (Kickoff)
;(function(KO) {

	document.addEventListener('DOMContentLoaded', function(e) {
		var navBtn = document.querySelector('.navBtn');
		var masthead = document.querySelector('.masthead');

		navBtn.addEventListener('click', function(e) {
			e.preventDefault();
			console.log(masthead.classList);
			if (masthead.classList.contains('is-active')) {
				masthead.classList.remove('is-active');
				console.log("remove class");
			} else {
				masthead.classList.add('is-active');
				console.log("add class");
			}
		});

		KO.Config.init();
	});



	KO.Config = {
		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	KO.Ui = {
		init : function() {
			KO.Ui.modal();
		},

		modal : function() {

		}
	};
	*/

})(window.KO = window.KO || {});
