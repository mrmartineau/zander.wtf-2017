/*	Author:
		TMW - (Author Name Here)
*/

// Create a closure to maintain scope of the '$' and KO (Kickoff)
;(function(KO) {
	document.addEventListener('DOMContentLoaded', function(e) {
		var navBtn = document.querySelector('.navBtn');
		var navFull = document.querySelector('.navFull');

		navBtn.addEventListener('click', function(e) {
			e.preventDefault();
			console.log(navFull.classList);
			if (navFull.classList.contains('is-active')) {
				navFull.classList.remove('is-active');
				console.log("remove class");
			} else {
				navFull.classList.add('is-active');
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
