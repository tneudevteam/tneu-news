const _ = require('lodash');
const cheerio = require('cheerio');
const {normalizeSpace} = require('normalize-space-x');
const {getNewsArticlePageHTML} = require('./fetch');

module.exports.parseArticle = async function(url) {
  const html = await getNewsArticlePageHTML(url);
  const $ = cheerio.load(html);
  const $article = $('#article');
  const subtitle = $article.find('.highlight').text();

  return {
    author: getAuthor(subtitle)
  };
};

function getAuthor(subtitle) {
  return normalizeSpace(_.last(subtitle.split('Автор: ')));
}
