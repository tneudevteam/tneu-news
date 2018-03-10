const cheerio = require('cheerio');
const {normalizeSpace} = require('normalize-space-x');
const _ = require('lodash');
const {parse} = require('date-fns');
const {getPageHTML} = require('./fetch');

const dateRegex = /\d+-\d+-\d+, \d+:\d+/;

module.exports.parsePage = async function parsePage(pageNumber) {
  const html = await getPageHTML(`http://www.tneu.edu.ua/news/page/${pageNumber}`);
  const $ = cheerio.load(html);
  const articles = $('#dle-content').find('.well');
  const items = getPageItems(articles);
  const totalPages = getTotalPages($);

  return {
    pageNumber,
    totalPages,
    items
  };
};

function getPageItems($articles) {
  return $articles
    .map(function(i, el) {
      const article = cheerio(el);
      const title = getTitle(article);
      const description = getDescription(article);
      const subtitle = getSubtitle(article);
      const publishedAt = getPublishedAt(subtitle);
      const topic = getTopic(subtitle);
      const primaryTopic = getPrimaryTopic(topic);
      const secondaryTopic = getSecondaryTopic(topic);
      const newsPageURL = getNewsPageURL(article);
      const imageURL = getImageURL(article);

      return {
        title,
        description,
        publishedAt,
        imageURL,
        topic,
        primaryTopic,
        secondaryTopic,
        newsPageURL
      };
    })
    .get();
}

function getTitle($article) {
  return $article.find('h4').text();
}

function getDescription($article) {
  return normalizeSpace($article.find('.timg').text());
}

function getSubtitle($article) {
  return $article.find('.highlight').text();
}

function getPublishedAt(subtitle) {
  const dateRaw = _.head(subtitle.match(dateRegex));
  return parse(dateRaw);
}

function getTopic(subtitle) {
  return normalizeSpace(_.last(subtitle.split(dateRegex)));
}

function getPrimaryTopic(topic) {
  if (!hasSubtopic(topic)) {
    return topic;
  }

  return _.head(topic.split('/'));
}

function getSecondaryTopic(topic) {
  if (!hasSubtopic(topic)) {
    return '';
  }

  return _.last(topic.split('/'));
}

function hasSubtopic(topic) {
  return topic.includes('/');
}

function getNewsPageURL($article) {
  return $article
    .find('a')
    .last()
    .attr('href');
}

function getImageURL($article) {
  const relativeImageURL = $article.find('img').attr('src');
  return `http://www.tneu.edu.ua${relativeImageURL}`;
}

function getTotalPages($) {
  return Number(
    $('.pagination > li')
      .first()
      .find('a')
      .last()
      .text()
  );
}
