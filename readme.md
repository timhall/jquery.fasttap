jQuery Fasttap
===

jQuery Fasttap was created with one purpose: make the default click behavior fast on mobile devices. There are a few libraries out there for making links and buttons more responsive, but they require defining callbacks and other manual set up. Fasttap listens for touch events and then fires the default click event (roughly 300ms sooner than it would otherwise be called).

```js
$('a, label').fasttap();
// That's it! Now all links and labels (checkbox, radio, etc) are super quick
```

References:

[Creating Fast Buttons for Mobile Web Applications](https://developers.google.com/mobile/articles/fast_buttons)

[jquery.touchToClick](https://github.com/cargomedia/jquery.touchToClick)

[Better Tap Behaviour with jquery.tappable.js](http://aanandprasad.com/articles/jquery-tappable/)