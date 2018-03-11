const _ = require('lodash');
const cheerio = require('cheerio');
const bytes = require('bytes');
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
    attachments: getAttachments($article),
    images: getImages($article)
  };
};

function getAuthor(subtitle) {
  return normalizeSpace(_.last(subtitle.split('Автор: ')));
}

function getContent($article) {
  const textRaw = $article.find('.timg').text();
  const textLines = textRaw.split('\n');
  const textLinesNormalized = _.compact(textLines.map(normalizeSpace));

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

      return {url, name, ...getAttachmentMetadata($attachment)};
    })
    .get();
}

function getAttachmentMetadata($attachment) {
  const metadataRaw = $attachment.remove('a').text();
  const fileSizeRaw = _.head(metadataRaw.match(/\[.+\]/));
  const downloadsCountRaw = _.head(metadataRaw.match(/\(.+\)/));

  return {
    fileSizeBytes: getFileSizeBytes(fileSizeRaw),
    downloadsCount: getDownloadsCount(downloadsCountRaw)
  };
}

function getFileSizeBytes(fileSizeRaw) {
  const fileSizeHumanized = fileSizeRaw.replace('[', '').replace(']', '');
  return bytes(fileSizeHumanized);
}

function getDownloadsCount(downloadsCountRaw) {
  return Number(_.head(downloadsCountRaw.match(/\d+/)));
}

function getImages($article) {
  return $article
    .find('a.highslide')
    .map(function(i, el) {
      const $a = cheerio(el);
      const $img = $a.find('img');

      return {
        fullSizeURL: $a.attr('href'),
        thumbnailURL: `http://www.tneu.edu.ua${$img.attr('src')}`
      };
    })
    .get();
}
