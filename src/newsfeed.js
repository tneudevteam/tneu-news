const cheerio = require('cheerio');
const {normalizeSpace} = require('normalize-space-x');
const {getNewsFeedPageHTML} = require('./fetch');
const {getSecondaryTopic, getPrimaryTopic, getTopicFromSubtitle} = require('./parsers/topic');
const {getPublishedAtDateFromSubtitle} = require('./parsers/date');

module.exports.parsePage = async function parsePage(pageNumber) {
  const html = await getNewsFeedPageHTML(pageNumber);
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
      const publishedAt = getPublishedAtDateFromSubtitle(subtitle);
      const topic = getTopicFromSubtitle(subtitle);
      const primaryTopic = getPrimaryTopic(topic);
      const secondaryTopic = getSecondaryTopic(topic);
      const newsPageURL = getNewsPageURL(article);
      const imageURL = getImageURL(article);

      return {
        title,
        description,
        publishedAt,
        topic,
        primaryTopic,
        secondaryTopic,
        imageURL,
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
