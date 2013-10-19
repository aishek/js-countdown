js-countdown
============

[Demo](http://aishek.github.io/js-countdown/) | [Latest Release v0.0.2](https://github.com/aishek/js-countdown/releases/tag/v0.0.2)

Javascript countdown ready-to-use solution with pluralization in English and Russian languages.

## Quick example
```html
<p style="text-align: center;">Until year 2038 problem remains<br><span id="output_target"></span></p>
```

```js
var output_target = document.getElementById('countdown'),
    label_builder = Countdown.Helper.Pluralize.label_builder_factory('en'),
    countdown = new Countdown(
      {
        progress: function(seconds) {
          output_target.innerHTML = label_builder(seconds);
        },
        complete: function() {
          output_target.innerHTML = 'Meet "Year 2038 problem"!';
        }
      }
    );

var date_2038_problem = Date.UTC(2038, 1, 19, 3, 14, 7),
    seconds_from_epoch_to_date_2038_problem = Math.floor(date_2038_problem / 1000);

countdown.start_to(seconds_from_epoch_to_date_2038_problem);
```

[All examples](http://aishek.github.io/js-countdown/)

## Features

* count to specified date and from specified date or from now
* built-in, extensible to any language text frontend with pluralization for English and Russian languages
* built-in, extensible counter for days, hours, minutes and seconds from passed or elapsed seconds
* design simplicity, extendability and modularity
* lightweight (about 3Kb minified)

## Alternative plugins for same task

* [Countdown js](http://countdownjs.org/)
* [Countdown](http://www.gieson.com/Library/projects/utilities/countdown/)
* [FlipClock.js](http://flipclockjs.com/)
* [jCounter](http://devingredients.com/jcounter/)
* [jQuery Countdown](http://keith-wood.name/countdown.html)

## Development

1. `npm install grunt-cli -g`
2. `npm install`
3. `https://github.com/gmarty/grunt-closure-compiler`
4. `grunt watch`

## Note on Patches / Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Send me a pull request. Bonus points for topic branches.

## License

It is free software, and may be redistributed under the terms specified in the LICENSE file.

## Credits

Contributors:

* [Alexandr Borisov](https://github.com/aishek)