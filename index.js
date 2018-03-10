const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function parsePage(pageNumber) {
  const html = await fetch(`http://www.tneu.edu.ua/news/page/${pageNumber}`).then(resp =>
    resp.text()
  );
  const $ = cheerio.load(html);
  const articles = $('#dle-content').find('.well');

  articles.each(function() {
    const article = $(this);
    const title = article.find('h4').text();
    const description = article.find('.timg').text();

    console.log({title, description});
  });
}

parsePage(1);
