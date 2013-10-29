// jquery.fasttap.js v1.0.0
// (c) Tim Hall
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function ($) {
    var touchSupported = ('ontouchstart' in window || 'createTouch' in document),
        clickbuster = (function () {
            var coordinates = [],
                delay = 2500,
                threshold = 25,
                preventGhostClick = function (x, y) {
                    coordinates.push(x, y);
                    window.setTimeout(pop, delay);
                },
                pop = function () {
                    coordinates.splice(0, 2);
                },
                onClick = function (event) {
                    for (var i = 0; i < coordinates.length; i += 2) {
                        var x = coordinates[i],
                            y = coordinates[i + 1];

                        if (Math.abs(event.clientX - x) < threshold
                            && Math.abs(event.clientY - y) < threshold) {
                            event.stopPropagation();
                            event.preventDefault();
                        }
                    }
                };

            return {
                preventGhostClick: preventGhostClick,
                onClick: onClick
            }
        })(),
        fireEvent = function (element, event) {
            if ('createEvent' in document) {
                var eventObj = document.createEvent('MouseEvents');
                eventObj.initEvent(event, true, false);
                element.dispatchEvent(eventObj);
            } else if ('createEventObject' in document) {
                var eventObj = document.createEventObject();
                element.fireEvent('on' + event, eventObj);
            }
        };

    // Register global clickbuster event handler
    $(document).on('click', clickbuster.onClick);

    $.fn.fasttap = function (options) {
        var $element = this,
            handlers = (function () {
                var startX, startY,
                    threshold = 10,
                    onTouchStart = function (event) {
                        event.stopPropagation();

                        $(event.target).on('touchend', onClick);
                        $('body').on('touchmove', onTouchMove);
                            
                        startX = event.originalEvent.touches[0].clientX;
                        startY = event.originalEvent.touches[0].clientY;
                    },

                    onTouchMove = function (event) {
                        if (Math.abs(event.originalEvent.touches[0].clientX - startX) > threshold ||
                            Math.abs(event.originalEvent.touches[0].clientY - startY) > threshold) {
                            reset();
                        }
                    },

                    onClick = function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                        reset();
                        
                        if (options && typeof options.callback === 'function') {
                            // If callback is defined, call it
                            options.callback.call(this, event);
                        } else if (event.type == 'touchend') {
                            // Otherwise, perform default click event for tap
                            fireEvent(event.target, 'click');
                        }

                        if (event.type == 'touchend') {
                            clickbuster.preventGhostClick(startX, startY);
                        }
                    },

                    reset = function () {
                        $element.off('touchend', onClick);
                        $('body').off('touchmove', onTouchMove);
                    },

                    handleEvent = function (event) {
                        switch (event.type) {
                            case 'touchstart': onTouchStart(event); break;
                            case 'touchmove': onTouchMove(event); break;
                            case 'touchend': onClick(event); break;
                            case 'click': onClick(event); break;
                        }
                    }

                return {
                    onTouchStart: onTouchStart,
                    onTouchMove: onTouchMove,
                    onClick: onClick,
                    handleEvent: handleEvent
                }
            })()

        // Register event handlers
        if (touchSupported) { $element.on('touchstart', handlers.onTouchStart); }
        if (options && options.callback) { $element.on('click', handlers.onClick); }

        return this;
    };
})(jQuery);
