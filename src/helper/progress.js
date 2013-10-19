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