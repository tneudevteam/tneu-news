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
    content: getContent($article),
    attachments: getAttachments($article)
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

function getAttachments($article) {
  return $article
    .find('.attachment')
    .map(function(i, el) {
      const $attachment = cheerio(el);
      const $attachmentLink = $attachment.find('a');
      const url = $attachmentLink.attr('href');
      const name = normalizeSpace($attachmentLink.text());
      const metadataRaw = $attachment.remove('a').text();

      console.log(metadataRaw);

      return {url, name};
    })
    .get();
}
