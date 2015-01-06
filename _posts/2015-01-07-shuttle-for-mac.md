---
comments: true
layout: post
title: "Use Shuttle to boost your development"
excerpt: Great menubar app for bash shortcuts
image: 15691192712_2cf3fc364d_m.jpg
---

I recently discovered Shuttle, a free little Mac menubar app by [Trevor Fitzgerald](http://trevorfitzgerald.com/). Its purpose is to be a shortcut menu for SSH commands but I think it can be used for so much more.

I work on many different projects on a regular basis: this site, [Kickoff](http://tmwagency.github.io/kickoff/), [trak.js](https://github.com/tmwagency/trak.js) & my work at [TMW](http://tmwunlimited.com); all of which use Grunt in some way to compile things or run static servers. Shuttle can be used to run any command you like, so it makes sense that it can navigate to your project's directories & run Grunt, gulp or whatever.

## Setting prefs
When you first open Shuttle, it adds `~/.shuttle.json`, just open it & change what you need. You can choose between Terminal or iTerm & add as many commands as you like; an example might be:

```json
"hosts": [
	{
		"name": "Martineau.tv",
		"cmd": "cd ~/htdocs/martineau.tv && grunt serve"
	}
]
```

## Did I mention it's free?
Download Shuttle from [fitztrev.github.io/shuttle/](http://fitztrev.github.io/shuttle/).

Are there some better uses for Shuttle? Leave a comment and let me know.
