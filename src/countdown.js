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
 * Starts countdown to point in future, specified is seconds.
 * Seconds, wich passes to progress callback, decremented in series.
 * When seconds became 0, no progress callback called,
 * but complete does, and countdown stops.
 *
 * @param {Number} seconds_form_unix_epoch_to_complete
 */
Countdown.prototype.start_to = function(seconds_form_unix_epoch_to_complete) {
  if (typeof(seconds_form_unix_epoch_to_complete) !== 'number') {
    throw new Error("must specify seconds_form_unix_epoch_to_complete for countdown.start_to()");
  }

  this.start(seconds_form_unix_epoch_to_complete, -1, 0);
};

/**
 * Starts countdown from fixed point, specified is seconds.
 * Seconds, wich passes to progress callback, incremented in series,
 * so complete callback never called.
 *
 * @param {Number} seconds_from_unix_epoch_to_start_from
 */
Countdown.prototype.start_from = function(seconds_from_unix_epoch_to_start_from) {
  if (typeof(seconds_from_unix_epoch_to_start_from) !== 'number') {
    seconds_from_unix_epoch_to_start_from = this.seconds_from_unix_epoch_now();
  }

  this.start(seconds_from_unix_epoch_to_start_from, 1, null);
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