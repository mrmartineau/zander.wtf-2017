---
title: Barilla
date: 2016-03-01
section: work
meta:
  name: barilla
  layout: wide

view:
  text: barilla.com
  url: http://barilla.com/

info:
 - key: Date
   value: Feb 2015 - Ongoing
 - key: Role
   value: Lead front-end developer
 - key: Style guide
   value: "View it"
   url: "http://barilla-static.tmwtest.co.uk"
 - key: Skills
   value: "ES2015, Styleguide-driven development"
 - key: Team
   value: "Front-end: Zander Martineau, Nic Bell, Denzil Brade; UX: Alex Harrold; Design: Simon Kinslow;"
 - key: Agency
   value: TMW
   url: http://tmwunlimited.com
 - key: Client
   value: Barilla
   url: http://barilla.com

images:
 - src: wide.jpg
   type: wide
 - src: skinny.jpg
   type: narrow
---
Barilla, the world's leading pasta maker, came to TMW to reimagine their existing web site. They operate in 30+ markets globally and needed a solution that would fit for each of their specific needs.

I collaborated with our UX and design teams to create a consistent, accessible, flexible and performant website that would enable consumers to find what they needed quickly.

I used a styleguide-driven approach to development using modular components where possible. This styleguide is a project in and of itself and serves as documentation and a living reference for all the modules and templates that are used on the site (Kickoff's [Statix](https://github.com/trykickoff/statix) made this job much more easy). View styleguide at its temporary home [here](//barilla-static-ci.tmwtest.co.uk).

From a technical perspective, all the Javascript was ES2015 compatible using Babel to transpile through the Browserify bundler. Many NPM modules were used to ensure maximum efficiency (so far, no issues with #unpublishgate). The ES2015 was ported to version 7 of [Kickoff](http://trykickoff.com). Teamcity was used to build/compile all client-side assets at each deployment.

We soft-launched to the US market in March 2016 with more locales being rolled out in the months following. We are actively developing new features and the site is constantly improving.
