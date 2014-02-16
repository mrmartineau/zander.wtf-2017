---
comments: true
layout: post
title: "More efficient Grunt workflows"
categories:
- code
- grunt
excerpt: "Useful tips for development with Grunt"
---
Most of my projects are fairly similar: I need to concatinate and compress a bunch of js files together; compile sass and fire-up a local server to test and preview.. Grunt.js is brilliant for this and I cannot tell you how much it has improved my workflow since I started using it this year. Along the way I have found a few time-savers that have greatly improved how I use Grunt so I thought I'd share them here with you.

## Dynamically load all Grunt tasks

If you use a bunch of Grunt tasks for your project you'll know that it is a pain, albeit slight, to individually register each task, especially when adding new packages. Why not register them all at once so that every time you add a new package you do not have to do anything except install it? Well [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) by [Sindre Sorhus](https://github.com/sindresorhus/) does just that.

<script src="https://gist.github.com/mrmartineau/7717920.js?file=load-grunt-tasks.js"></script>

See how it's done in Kickoff's [Gruntfile](https://github.com/tmwagency/kickoff/blob/master/Gruntfile.js#L226)

## Check and find updates for your NPM dependencies

Have you ever found it hard to know if [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) has been updated recently? What would happen if you wanted to check all your project's dependencies and then install them? It would take ages. [npm-check-updates](https://npmjs.org/package/npm-check-updates) takes care of this for you; it actually does the check and can even update your package.json with any changes so you all you now need to do is run `npm-check-updates -u && npm install`. I suggest installing the package globally (`sudo npm install npm-check-updates -g`) so that you can always use it from any directory.

To make this even easier to use I created a bash alias: `alias npmui="npm-check-updates -u && sudo npm install"`. Add this to your `~/.bash-profile` and you're good to go.

## Use variables to avoid repetition
Typically there will be about two or three places within my `Gruntfile.js` that I declare the same group of files that will be used by certain tasks so to avoid repetition I create an array that lists each file which I use throughout my Gruntfile (I also use simple variables to specify file or directory names).

A good example of this might be javascripts used by [jshint](https://github.com/gruntjs/grunt-contrib-jshint), [uglifyjs](https://github.com/gruntjs/grunt-contrib-uglify) and my watch task. Where each of these tasks specify a `src` key, I provide a variable as their value. See below for a simplified example of this or have another look at Kickoff's [Gruntfile](https://github.com/tmwagency/kickoff/blob/master/Gruntfile.js) for a more extensive example.

<script src="https://gist.github.com/mrmartineau/7717920.js?file=grunt-variables.js"></script>

## Create local server and watch for changes
[Grunt connect](https://github.com/iammerrick/grunt-connect) is extremely useful for creating a local server, but having it running means that you can't run `grunt watch` at the same time. To overcome this problem, register a new Grunt task called `serve` that runs grunt watch and grunt connect. See below:

```
grunt.registerTask("serve", ["connect", "watch"]);
```

Use `grunt serve` to run the task; see how this was used in Kickoff's [Gruntfile](https://github.com/tmwagency/kickoff/blob/master/Gruntfile.js#L263) and in particular lines [171-184](https://github.com/tmwagency/kickoff/blob/master/Gruntfile.js#L171-L184).

### Conclusion
These are just a few that I use regularly but I'm sure there are more. Please leave a comment with any suggestions or other useful tips you may have.

If you haven't used Grunt before and are looking to improve your workflow I highly recommend checking it out, see [gruntjs.com](http://gruntjs.com) for more info.
