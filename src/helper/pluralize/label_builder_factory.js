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