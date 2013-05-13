---
comments: false
layout: post
title: "How to fix hidden characters in password inputs in old Internet Explorer. Hint: web fonts"
categories:
- Code
---

I came across an interesting bug recently where, in **Internet Explorer (versions 6-8)**, the _dot_ characters for an `input[type="password"]` were not showing up. I could see the cursor moving as if text was being entered but no result was being shown.

After many attempts to remedy this, I finally figured out the issue was with the font being used in this field. For some reason, the 'dot' character that is usually used could not be used by IE, even though it's actually present in the font and my font-stack provided a good few alternatives just in case there might be any issues. So, I added one simple rule to my CSS and it fixed the issue:

{% highlight html %}
input[type="password"] {
	font-family: sans-serif;
}
{% endhighlight %}

**I will be adding this to all projects from now on, and so should you.**

### Here's an example:

[View it on BrowserStack](http://www.browserstack.com/start#os=Windows&os_version=XP&browser=IE&browser_version=8.0&zoom_to_fit=true&url=http%3A%2F%2Fcodepen.io%2Fmrmartineau%2Ffull%2FgvlIt&resolution=1280x1024&speed=2)

<pre class="codepen" data-height="300" data-type="result" data-href="gvlIt" data-user="mrmartineau" data-safe="true"><code></code><a href="http://codepen.io/mrmartineau/pen/gvlIt">Check out this Pen!</a></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>