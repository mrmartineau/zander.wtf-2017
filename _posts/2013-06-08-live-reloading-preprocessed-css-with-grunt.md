---
comments: true
layout: post
title: "Live reloading preprocessed CSS with Grunt"
categories:
- code
- grunt
---

Having recently changed my development process from using the awesome [Codekit](http://incident57.com/codekit/) to using [Grunt](http://gruntjs.com), I was frustrated that I no longer had live updates when I made changes to my CSS, fortunately for me, there is a plugin for Grunt that solves this problem (and I happened to be using it already).

Now Codekit's implementation is very good, it compiles your preprocessed styles and automatically updates your browser's styles _without_ a page refresh - it even transitions from the old styles to new. The Grunt plugin in question is called [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch), it is a common plugin developed by the maintainers of Grunt itself and has recently been updated to allow live reloading to work.

We are going to add a new subtask within the existing _watch_ task called **livereload** that monitors your generated CSS file(s) (or directory) for changes and then triggers a livereload. Make sure you include `options: { livereload: true }` otherwise the livereload server will not work. See below for what my livereload watch subtask looks like:
{% gist 5734805 grunt-watch-livereload-subtask.js %}

### Install browser extensions
Adding the subtask above is not enough, you will need to install the Livereload browser extension in order to see the styles live reload. It is available for [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) and [Firefox](https://addons.mozilla.org/en-us/firefox/addon/livereload/). Visit your

### Run the watch task
Now all you need to do is run `grunt watch`, start editing your preprocessed CSS and view the styles reloading as you make those changes. Bear in mind that depending on the complexity of your preprocessed CSS, it might take a few seconds for the change to appear - SASS is notoriously slow if you use many `@extend`s.

Here's an example of a full watch task with the included `scss`, `js` and `livereload` subtasks:
{% gist 5734805 grunt-watch-task.js %}

Is there anything that I could improve on? I would love to know if there is.