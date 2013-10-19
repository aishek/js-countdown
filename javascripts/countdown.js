/** @preserve javascript Countdown v0.0.2
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/js-countdown
 */

 // feel free to change this name
 var Countdown = (function(){
/**
 * Creates a Countdown instance
 *
 * @constructor
 * @param {Object} options
 * @param {Function} [options.progress] callback for each countdown tick, will call with seconds argument
 * @param {Function} [options.complete] callback for countdown complete
 */
function Countdown(options){
  this.handlers = this.init_handlers(options);
  this.sign = null;
};

/**
 * Starts countdown to point in future, specified is seconds from epoch
 * ({@link http://en.wikipedia.org/wiki/Unix_time|Unix_time}). Seconds,
 * which passes to progress callback, decremented in series. When
 * seconds became 0, no progress callback called, but complete does,
 * and countdown stops.
 *
 * @param {Number} seconds_form_unix_epoch_to_complete
 */
Countdown.prototype.start_to = function(seconds_form_unix_epoch_to_complete) {
  if (typeof(seconds_form_unix_epoch_to_complete) !== 'number') {
    throw new Error("must specify seconds_form_unix_epoch_to_complete for countdown.start_to()");
  }

  var current = seconds_form_unix_epoch_to_complete - this.seconds_from_unix_epoch_now();
  this.start(current, -1, 0);
};

/**
 * Starts countdown from fixed point, specified is seconds from epoch
 * ({@link http://en.wikipedia.org/wiki/Unix_time|Unix_time}).
 * Seconds, wich passes to progress callback, incremented in series,
 * so complete callback never called.
 *
 * @param {Number} [seconds_from_unix_epoch_to_start_from=now]
 */
Countdown.prototype.start_from = function(seconds_from_unix_epoch_to_start_from) {
  if (typeof(seconds_from_unix_epoch_to_start_from) !== 'number') {
    seconds_from_unix_epoch_to_start_from = this.seconds_from_unix_epoch_now();
  }

  var current = this.seconds_from_unix_epoch_now() - seconds_from_unix_epoch_to_start_from;
  this.start(current, 1, null);
};

/** @private */
Countdown.prototype.init_handlers = function(options) {
  if (!options) {
    options = {};
  }
  var dummy_handler = function(){};

  return {
    progress: options.progress || dummy_handler,
    complete: options.complete || dummy_handler
  };
};

/** @private */
Countdown.prototype.seconds_from_unix_epoch_now = function() {
  var now_timestamp = (new Date()).getTime(),
      result = Math.floor(now_timestamp / 1000);

  return result;
};

/** @private */
Countdown.prototype.start = function(current, sign, complete_at) {
  this.set_current(current);
  this.sign = sign;
  this.complete_at = complete_at;

  this.resume_ticking();
};

/** @private */
Countdown.prototype.pause_ticking = function() {
  clearInterval(this.interval_id);
};

/** @private */
Countdown.prototype.resume_ticking = function() {
  var _this = this;

  this.interval_id = setInterval(
    function() {
      _this.tick();
    },
    1000
  );
};

/** @private */
Countdown.prototype.set_current = function(current) {
  this.current = current;
  this.handlers.progress(this.current);
};

/** @private */
Countdown.prototype.tick = function() {
  this.set_current(this.current + this.sign);

  if ( this.current === this.complete_at ) {
    this.handlers.complete();
    this.reset();
  }
};

/** @private */
Countdown.prototype.reset = function(current) {
  this.pause_ticking();
  this.sign = null;
};
Countdown.Helper = {};
/**
 * Creates a Progress instance: container for days, hours, minutes, seconds calculated from passed seconds;
 *
 * @constructor
 * @param {Number} seconds
 */
function Progress(seconds) {
  this.value = seconds;
};

/**
 * @returns {Number} seconds from seconds, passed to constructor, minus days, hours and minutes
 */
Progress.prototype.seconds = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.seconds;
};

/**
 * @returns {Number} minutes from seconds, passed to constructor, minus days and hours
 */
Progress.prototype.minutes = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.minutes;
};

/**
 * @returns {Number} hours from seconds, passed to constructor, minus days
 */
Progress.prototype.hours = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.hours;
};

/**
 * @returns {Number} days from seconds, passed to constructor
 */
Progress.prototype.days = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.days;
};

/** @private */
Progress.prototype.SECONDS_COUNTS = [86400, 3600, 60, 1];

/** @private */
Progress.prototype.calculate = function() {
  var seconds_counts = this.SECONDS_COUNTS,
      values = [],
      remains = this.value,
      current_seconds_count,
      current_value;

  for(var i = 0, l = seconds_counts.length; i < l; i++) {
    current_seconds_count = seconds_counts[i];
    current_value = Math.floor(remains / current_seconds_count);

    values.push(current_value);

    remains = remains - current_value * current_seconds_count;
  };

  return {
    days: values[0],
    hours: values[1],
    minutes: values[2],
    seconds: values[3]
  };
};

Countdown.Helper.Progress = Progress;
Countdown.Helper.Pluralize = {};
function ru_pluralize(number, one, few, many, other) {
  var _ref, _ref1, _ref2, _ref3;

  if (other == null) {
    other = few;
  }
  if ((number % 10) === 1 && number % 100 !== 11) {
    return one;
  } else {
    if (((_ref = number % 10) === 2 || _ref === 3 || _ref === 4) && !((_ref1 = number % 100) === 12 || _ref1 === 13 || _ref1 === 14)) {
      return few;
    } else {
      if ((number % 10) === 0 || ((_ref2 = number % 10) === 5 || _ref2 === 6 || _ref2 === 7 || _ref2 === 8 || _ref2 === 9) || ((_ref3 = number % 100) === 11 || _ref3 === 12 || _ref3 === 13 || _ref3 === 14)) {
        return many;
      } else {
        return other;
      }
    }
  }
};

var ru_pluralize_data = {
  seconds: ['секунда', 'секунды', 'секунд', 'секунды'],
  minutes: ['минута', 'минуты', 'минут', 'минуты'],
  hours: ['час', 'часа', 'часов', 'часа'],
  days: ['день', 'дня', 'дней', 'дня']
};

function ru_pluralize_args(number, key) {
  var args = [number],
      data = ru_pluralize_data[key];

  for(var i = 0; i < 4; i++) {
    args.push(data[i]);
  }

  return args;
};

Countdown.Helper.Pluralize.ru = {
  seconds: function(number) {
    var args = ru_pluralize_args(number, 'seconds');
    return ru_pluralize.apply(this, args);
  },
  minutes: function(number) {
    var args = ru_pluralize_args(number, 'minutes');
    return ru_pluralize.apply(this, args);
  },
  hours: function(number) {
    var args = ru_pluralize_args(number, 'hours');
    return ru_pluralize.apply(this, args);
  },
  days: function(number) {
    var args = ru_pluralize_args(number, 'days');
    return ru_pluralize.apply(this, args);
  }
};
function en_pluralize(number, singular) {
  return (number === 1 ? singular : singular + 's');
};

Countdown.Helper.Pluralize.en = {
  seconds: function(number) {
    return en_pluralize(number, 'second');
  },
  minutes: function(number) {
    return en_pluralize(number, 'minute');
  },
  hours: function(number) {
    return en_pluralize(number, 'hour');
  },
  days: function(number) {
    return en_pluralize(number, 'day');
  }
};
/**
 * Returns function, which returns label for days, hours, minutes and seconds in pluralized style
 * for passed seconds (for example "1 day 2 hours 3 minutes 1 second") in specified language.
 *
 * @param {String} language language, wich use for pluralization of days, hours, minutes and seconds
 * @returns {Function}
 */
Countdown.Helper.Pluralize.label_builder_factory = function(language) {
  var language_base = Countdown.Helper.Pluralize[language];

  return function(seconds) {
    var progress = new Countdown.Helper.Progress(seconds),
        label = [];

    var days = progress.days();
    if (days > 0) {
      label.push(days + ' ' + language_base.days(days));
    }

    var hours = progress.hours();
    if (hours > 0) {
      label.push(hours + ' ' + language_base.hours(hours));
    }

    var minutes = progress.minutes();
    if (minutes > 0) {
      label.push(minutes + ' ' + language_base.minutes(minutes));
    }

    var seconds = progress.seconds();
    label.push(seconds + ' ' + language_base.seconds(seconds));

    label = label.join(' ');

    return label;
  };
};
  return Countdown;
})();