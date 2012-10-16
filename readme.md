jQuery Fasttap
===

jQuery Fasttap was created with one purpose: make the default click behavior fast on mobile devices. There are a few libraries out there for making links and buttons more responsive, but they require defining callbacks and other manual set up. Fasttap listens for touch events and then fires the default click event (roughly 300ms sooner than it would otherwise be called).

```js
$('a, label, button, input[type="button"]').fasttap();
// That's it! Now all links, labels (checkbox, radio, etc), buttons and more are super quick

// If you really like defining callbacks you can do that too
$('.fast').fasttap({
    callback: function (event) { alert('Fasttap!'); }
});
```

Based heavily on Google's recommendations for creating fast buttons, Fasttap does its best to ignore scrolling and other dragging and preventing ghost clicks that can occur if the click event is still called after being handled in the tap event. All for about 600 bytes once minified and gzipped!

References:

[Creating Fast Buttons for Mobile Web Applications](https://developers.google.com/mobile/articles/fast_buttons)

[jquery.touchToClick](https://github.com/cargomedia/jquery.touchToClick)

[Better Tap Behaviour with jquery.tappable.js](http://aanandprasad.com/articles/jquery-tappable/)