---
layout: post
title: "Soho Fixed launches"
categories:
- Launch
image: soho-fixed-header.png
excerpt: ""
image: https://farm6.staticflickr.com/5472/14458611696_6c01265d21_c.jpg
link:
  url: "http://sohofixed.com"
  text: "sohofixed.com"
---
[Soho Fixed](http://sohofixed.com), the brainchild of my mate, Jolyon, has just been launched. The site showcases fixie bikes built from new & unique reconditioned parts. A few bikes are built each month & they sell on a first come, first serve basis - so you gotta be quick!

I designed the site, the branding, coded the site & shot all the photos that you see with the exception of the actual bike shots; those were taken by the legend [Julian Marshall](http://julianmarshall.com).

If you live in London & are thinking about getting a bike, I urge you to check-out a Soho Fixed bike. To stay up-to-date with bike releases & info you can follow [@sohofixed](http://twitter.com/sohofixed) on Twitter, [become a fan](http://www.facebook.com/pages/Soho-Fixed/162808170418069) on Facebook or signup to the list in the footer of the [site](http://sohofixed.com/).

### Technical notes
The site is built on [Textpattern](http://textpattern.com) & as any self-respecting front-end developer should, I used a bunch of the new [HTML5](http://blog.whatwg.org/html-is-the-new-html5) a sprinkling of CSS3 around the site.

#### Header & Nav
The header & nav has an animated background. I used webkit's keyframe animation, see code for it below:

```css
@-keyframes bg-slide {
	0% { background-position: left top;
	}
	25% { background-position: right center;
	}
	50% { background-position: left bottom;
	}
	75% { background-position: right 70%;
	}
	100% { background-position:left top;
	}
}
header {
	animation: bg-slide 25s 2 ease-in;
}
```

#### Nav hover effect
It is so simple but looks great; on hover, I increased the
`letter-spacing` (notice the different easing on hover & mouse out),
here’s the code:

```css
nav a {
	transition: all .4s ease-in;
}
nav a:hover {
	transition: all .4s ease-out;
}
nav a:hover {
	background-color: rgba(255,255,255,0.7);
	letter-spacing: 10px;
}
```


#### Bike listing hover effect
For those browsers with support for CSS3 3d tranformations, I used a rather splendid flipping effect that. [View it here](http://sohofixed.com/bikes/) by hovering over the bike thumbnails.

And that about wraps things up. Please visit the site & have a browse-around, I’d love to hear any thoughts you guys may have.

![Bike page](/img/posts/dist/230.png)
