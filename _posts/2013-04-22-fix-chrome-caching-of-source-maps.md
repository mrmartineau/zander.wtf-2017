---
comments: true
layout: post
title: Fix Chrome caching of Source Maps
categories:
- Code
- DevTools
excerpt: ""
image: https://farm6.staticflickr.com/5483/14311404330_bfb9b1d209_c.jpg
---

Over the past few days I have (finally) started tinkering with [Grunt](http://gruntjs.com/) and one feature, [Source Maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/), was not quite working for me. I had set up my Uglify task that concats, uglifies and creates a source map of the various files and all was well, that is, until I realised that these source maps were not updating along with the changes to my compiled javascript. I didn't realise quickly enough that Chrome (in my case, Canary) was caching these source maps despite the `Disable cache` option was enabled.

![](http://cl.ly/OU1y/Screen%20Shot%202013-04-22%20at%2023.23.59.png)

### Fix it

Go to the 'Network' tab (in dev tools), right click and select 'Clear browser cache', then close any open files in the 'Sources' tab. Now, refresh the page and that's it - source maps updated!

![](http://cl.ly/OTj9/Screen%20Shot%202013-04-22%20at%2023.27.18.png)
![](http://cl.ly/OUC6/Screen%20Shot%202013-04-22%20at%2023.31.54.png)

Let me know if that worked for you, or if there's another way to fix this issue.
