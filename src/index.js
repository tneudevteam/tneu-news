const cheerio = require('cheerio');
const {getPageHTML} = require('./fetch');

module.exports.parsePage = async function parsePage(pageNumber) {
  const html = await getPageHTML(`http://www.tneu.edu.ua/news/page/${pageNumber}`);
  const $ = cheerio.load(html);
  const articles = $('#dle-content').find('.well');

  articles.each(function() {
    const article = $(this);
    const title = article.find('h4').text();
    const description = article.find('.timg').text();

    console.log({title, description});
  });
};
