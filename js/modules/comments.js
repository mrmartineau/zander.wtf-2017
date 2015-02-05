var loadJS = require('./loadJS.js');

function Comments() {
	var commentsToggleBtn = document.querySelector('.loadComments');
	console.log("Comments!!");

	if (commentsToggleBtn === null) {
		console.log("comments not there");
		return;
	} else {
		console.log("comments there");
	}

	var disqusEl          = document.querySelector('#disqus_thread');

	function toggleComments(e) {
		e.preventDefault();
		commentsToggleBtn.classList.toggle('is-hidden');
		disqusEl.classList.toggle('is-hidden');
		loadJS('//' + disqus_shortname + '.disqus.com/embed.js', viewComments);
	}

	function viewComments() {
		window.scrollY += 200;
	}

	commentsToggleBtn.addEventListener('click', toggleComments);
}

module.exports = Comments;
