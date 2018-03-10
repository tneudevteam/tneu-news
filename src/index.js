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

  return {
    pageNumber,
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
      const newsPageURL = getNewsPageURL(article);
      const imageURL = getImageURL(article);

      return {title, description, publishedAt, imageURL, topic, newsPageURL};
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
