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
    author: getAuthor(subtitle),
    content: getContent($article)
  };
};

function getAuthor(subtitle) {
  return normalizeSpace(_.last(subtitle.split('Автор: ')));
}

function getContent($article) {
  const textRaw = $article.find('.timg').text();
  const textLines = textRaw.split('\n');
  const textLinesNormalized = textLines.map(normalizeSpace);

  return textLinesNormalized.join('\n');
}
