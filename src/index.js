const cheerio = require('cheerio');
const {normalizeSpace} = require('normalize-space-x');
const {getPageHTML} = require('./fetch');

module.exports.parsePage = async function parsePage(pageNumber) {
  const html = await getPageHTML(`http://www.tneu.edu.ua/news/page/${pageNumber}`);
  const $ = cheerio.load(html);
  const articles = $('#dle-content').find('.well');
  const news = [];

  articles.each(function() {
    const article = $(this);
    const title = article.find('h4').text();
    const description = normalizeSpace(article.find('.timg').text());

    news.push({title, description});
  });

  return news;
};
