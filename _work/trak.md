---
title: "Trak.js"
date: 2014-04-01
section: work
excerpt: Analytics
meta:
  name: trak
  date: Ongoing
  skills: "Javascript"
  layout: wide

type: code

view:
  text: github.com/mrmartineau/trak.js
  url: http://github.com/mrmartineau/trak.js

info:
 - key: NPM
   value: npmjs.com/package/trak.js
   url: https://www.npmjs.com/package/trak.js

github:
  user: mrmartineau
  repo: trak.js

npm:
  package: trak.js
---
trak.js is a wrapper for any analytics API. By default it uses Google Universal Analytics but you can override this with the older ga.js or Google Tag Manager if you wish, or you can even add custom event trackers as well, instead of Google Analytics.


```html
<a
 data-trak='{"category":"Rating","action":"Comparison notepad","label":"Up"}'
 href="#">
	link
</a>
```

```js
el.addEventListener('mouseover', function() {
  trak.event({
    category: 'engagement',
    action: 'signpost',
    label: 'page.href',
    value: 10,
    nonInteraction: true,
    eventName: 'This is a Google Tag Manager event name'
  });
}
```
