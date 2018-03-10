const {parse, subDays} = require('date-fns');
const _ = require('lodash');

const dateRegex = /\d+-\d+-\d+, \d+:\d+/;

module.exports.getPublishedAtDateFromSubtitle = function(subtitle) {
  if (subtitle.includes('Сьогодні')) {
    return new Date();
  }

  if (subtitle.includes('Вчора')) {
    return subDays(new Date(), 1);
  }

  const dateRaw = _.head(subtitle.match(dateRegex));
  const dateWithDayFirst = swapDayAndMonthInDate(dateRaw);

  return parse(dateWithDayFirst);
};

function swapDayAndMonthInDate(date) {
  return date.replace(/(\d+)-(\d+)-(\d+)/, '$2-$1-$3');
}
