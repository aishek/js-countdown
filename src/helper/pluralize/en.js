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