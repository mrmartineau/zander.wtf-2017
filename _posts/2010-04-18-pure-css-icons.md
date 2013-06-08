---
layout: post
title: "Pure CSS Icons"
categories:
- Code
- CSS
comments: true
comments_id: 211
comments_old: true
---

Having marvelled at [David Desandro's Opera Logo](http://desandro.com/articles/opera-logo-css/) made entirely in HTML and CSS, I wanted to try a similar experiment for myself. So with a large scoop of border-radius I set about trying to create various 'common' icons that could be used in your web apps.

To skip all the explanation and view these icons in their entirety, [click for the demo](http://rathersplendid.net/cssicons/)

### CSS3
These icons use lots of CSS3, border-radius being the most obvious but also rotation, gradients and transform (for when an icon is hovered over).

### Size?

These icons needed to be functional and useful for the web, so all dimensions are em-based so that all you have to do to change the size of the icon is just change the font-size of their containing element.

### Disclaimer

I'm sure its obvious but just to be clear, these icons will not work very well in Internet Explorer.

#### RSS
My first idea was simply an RSS icon, it seemed easy enough and indeed it was. I created a two variations, one with the traditional orange background and one without.
![RSS](/img/posts/211.png)

#### Heart
Made with just two spans rotated at opposite angles.
![Heart](/img/posts/210.png)

#### iPhone
With a big dose of inspiration from the brilliant [Helveticons](http://helveticons.ch) icon set, I created this iPhone icon. Three spans within one container div.
![iPhone](/img/posts/209.png)

#### Microphone
Easily the most interesting icon to code, this icon uses a few more elements than any of the others.
![Heart](/img/posts/208.png)

#### Block
A simple div with a rotated span within.
![Block](/img/posts/207.png)

#### Triangle
One div that make uses borders to create the illusion of a triangle.
![Triangle](/img/posts/206.png)

#### Disc, Target & Mini Target
![Triangle](/img/posts/205.png)

#### Can & upright can
Variations on the disc and target icons; I found it quite interesting to see what happens when you changes the dimensions of their containers. If it was wider, I think the Can could be used quite effectively as a button.
![Triangle](/img/posts/204.png)

#### Eye
Without a doubt, my favourite of all the icons, it only uses one container and a span within. I had initially tried to use one span for the larger circle shap, two spans for each of the points and another for the 'pupil' of the eye. I quickly realised that this was not needed and instead created a box with two very rounded corners, then I rotated it 45 degrees and inserted the inner span for the pupil. Neat huh?
![Triangle](/img/posts/203.png)

### An interesting discovery or maybe just my incompetence..
I tried these icons out on an iPhone and found a peculiar problem, it seems the iPhone cannot handle particularly large rounded corners, take a look at the screengrab to the left to see what I mean. Does anyone know why or if I have made an error? Please enlighten me.
![Triangle](/img/posts/202.png)

I do intend on exploring this idea further, but I would love to know what everyone's thoughts and suggestions are; can these be impoved or created using less code..?

[Click for the demo](http://rathersplendid.net/cssicons/)