---
title: "interactionCheck.js"
date: 2015-04-06
section: work
meta:
  name: interactionCheck
  date: Ongoing
  skills: "Javascript"
  layout: wide

type: code

view:
  text: github.com/mrmartineau/InteractionCheck.js
  url: http://github.com/mrmartineau/InteractionCheck.js

info:
 - key: NPM
   value: interactioncheck
   url: https://www.npmjs.com/package/interactioncheck

github:
  user: mrmartineau
  repo: InteractionCheck.js

npm:
  package: trak.js
---
Fire a callback method after a given period of inactivity.

```js
// Listen for mousemove event
var mousemoveCheck = new InteractionCheck('mousemove', 4000, function() {
	console.log('no mousemove');
});
```
