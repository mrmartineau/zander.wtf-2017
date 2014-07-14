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
			if (document.body.classList.contains('is-nav-active')) {
				document.body.classList.remove('is-nav-active');
				console.log("remove class");
			} else {
				document.body.classList.add('is-nav-active');
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
