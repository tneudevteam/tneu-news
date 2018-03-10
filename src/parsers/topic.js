const {normalizeSpace} = require('normalize-space-x');
const _ = require('lodash');

const dateRegex = /\d+-\d+-\d+, \d+:\d+/;

module.exports.getTopicFromSubtitle = function(subtitle) {
  const subtitleParts = subtitle.split(dateRegex);

  return normalizeSpace(_.last(subtitleParts));
};

module.exports.getPrimaryTopic = function(topic) {
  if (!hasSubtopic(topic)) {
    return normalizeSpace(topic);
  }

  const topicParts = topic.split('/');

  return normalizeSpace(_.head(topicParts));
};

module.exports.getSecondaryTopic = function(topic) {
  if (!hasSubtopic(topic)) {
    return '';
  }

  const topicParts = topic.split('/');

  return normalizeSpace(_.last(topicParts));
};

function hasSubtopic(topic) {
  return topic.includes('/');
}
