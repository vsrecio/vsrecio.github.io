---
title: "Go Templates for Containers"
date: 2021-04-03T22:53:58+05:30
draft: false
github_link: "https://github.com/vsrecio/vsrecio.github.io"
author: "Victor S. Recio"
tags:
  - Containers
  - Golang
  - Docker
  - Kubernetes
image: /images/gotemplate.png
description: ""
toc: 
---

Golang allows us to manage our containers more effectively. :zap:

## Introduction

Currently it is not a secret that in the world of containers, the [top 10](https://www.tldevtech.com/best-projects-made-with-go-lang/) of the tools are created in Golang, (the programming language created by Google), which allows us to make use of the characteristics of this language for the administration of our containers.

One of the most important steps in the administration of our containers is the visualization of the content of these or the inspection of the information of the same. For this we have the command docker inspect [container] - kubectk inspect [pod] with which we can view all the information of a container/pod in a Go template "Go template" with JSON format:

* Container/pod name
* Volumes
* IP
* ID
* Execution Time
* Labels
* First command executed when the container/pod starts
* DNS information
* User inside the container/pod
* PATH variables
* Port
* MacAddress


![alt text](/images/terminal_1.png "Optional Title")


To enable emoji globally, set ```enableEmoji``` to ```true``` in your site’s [configuration](https://gohugo.io/getting-started/configuration/) and then you can type emoji shorthand codes directly in content files; e.g.

The [Emoji cheat sheet](http://www.emoji-cheat-sheet.com/) is a useful reference for emoji shorthand codes.

<hr>

**N.B.** The above steps enable Unicode Standard emoji characters and sequences in Hugo, however the rendering of these glyphs depends on the browser and the platform. To style the emoji you can either use a third party emoji font or a font stack; e.g.

```
.emoji {
  font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols;
}
```