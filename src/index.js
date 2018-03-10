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
  const news = [];

  articles.each(function() {
    const article = $(this);
    const title = article.find('h4').text();
    const description = normalizeSpace(article.find('.timg').text());
    const subtitle = article.find('.highlight').text();
    const dateRaw = _.head(subtitle.match(dateRegex));
    const publishedAt = parse(dateRaw);
    const topic = normalizeSpace(_.last(subtitle.split(dateRegex)));

    news.push({title, description, publishedAt, topic});
  });

  return news;
};
