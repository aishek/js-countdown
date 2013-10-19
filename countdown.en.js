/** @preserve javascript Countdown v0.0.1
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/js-countdown
 */
 var Countdown = (function(){
var undefined;

function Countdown(options){
  if (!options) {
    options = {};
  }
  var dummy_handler = function(){};

  this.handlers = {
    progress: options.progress || dummy_handler,
    complete: options.complete || dummy_handler
  };

  this.sign = null;
};

Countdown.prototype.start_to = function(seconds_form_unix_epoch_to_complete) {
  if (typeof(seconds_form_unix_epoch_to_complete) !== 'number') {
    throw new Error("must specify seconds_form_unix_epoch_to_complete for countdown.start_to()");
  }

  this.start(seconds_form_unix_epoch_to_complete, -1, 0);
};

Countdown.prototype.start_from = function(seconds_from_unix_epoch_to_start_from) {
  if (typeof(seconds_from_unix_epoch_to_start_from) !== 'number') {
    seconds_from_unix_epoch_to_start_from = this.seconds_from_unix_epoch_now();
  }

  this.start(seconds_from_unix_epoch_to_start_from, 1, null);
};

/**
 * @private
 */
Countdown.prototype.seconds_from_unix_epoch_now = function() {
  var now_timestamp = (new Date()).getTime(),
      result = Math.floor(now_timestamp / 1000);

  return result;
};

/**
 * @private
 */
Countdown.prototype.start = function(current, sign, complete_at) {
  this.set_current(current);
  this.sign = sign;
  this.complete_at = complete_at;

  this.resume_ticking();
};

/**
 * @private
 */
Countdown.prototype.pause_ticking = function() {
  clearInterval(this.interval_id);
};

/**
 * @private
 */
Countdown.prototype.resume_ticking = function() {
  var _this = this;

  this.interval_id = setInterval(
    function() {
      _this.tick();
    },
    1000
  );
};

/**
 * @private
 */
Countdown.prototype.set_current = function(current) {
  this.current = current;
  this.handlers.progress(this.current);
};

/**
 * @private
 */
Countdown.prototype.tick = function() {
  this.set_current(this.current + this.sign);

  if ( this.current === this.complete_at ) {
    this.handlers.complete();
    this.reset();
  }
};

/**
 * @private
 */
Countdown.prototype.reset = function(current) {
  this.pause_ticking();
  this.sign = null;
};
Countdown.Helper = {};
function Progress(seconds) {
  this.value = seconds;
};

Progress.prototype.seconds = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.seconds;
};

Progress.prototype.minutes = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.minutes;
};

Progress.prototype.hours = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.hours;
};

Progress.prototype.days = function() {
  if (!this.calculated) {
    this.calculated = this.calculate();
  }

  return this.calculated.days;
};

Progress.prototype.SECONDS_COUNTS = [86400, 3600, 60, 1];

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