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