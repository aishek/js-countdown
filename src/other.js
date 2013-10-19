


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
  }

  // Countdown.Helper.Pluralize = {
  //   en: function(number, word) {
  //     if (number === 1) {
  //       return word;
  //     }
  //     else {
  //       return word + 's';
  //     }
  //   },
  //   ru: {
  //     seconds:
  //     minutes:
  //     hours:
  //     days:
  //   }

  //   ru: function(number, one, few, many, other) {
  //     var _ref, _ref1, _ref2, _ref3;

  //     if (other == null) {
  //       other = few;
  //     }
  //     if ((number % 10) === 1 && number % 100 !== 11) {
  //       return one;
  //     } else {
  //       if (((_ref = number % 10) === 2 || _ref === 3 || _ref === 4) && !((_ref1 = number % 100) === 12 || _ref1 === 13 || _ref1 === 14)) {
  //         return few;
  //       } else {
  //         if ((number % 10) === 0 || ((_ref2 = number % 10) === 5 || _ref2 === 6 || _ref2 === 7 || _ref2 === 8 || _ref2 === 9) || ((_ref3 = number % 100) === 11 || _ref3 === 12 || _ref3 === 13 || _ref3 === 14)) {
  //           return many;
  //         } else {
  //           return other;
  //         }
  //       }
  //     }
  //   }
  // };