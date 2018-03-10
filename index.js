const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function parsePage(pageNumber) {
  const html = await fetch(`http://www.tneu.edu.ua/news/page/${pageNumber}`).then(resp =>
    resp.text()
  );
  const $ = cheerio.load(html);
  const articles = $('#dle-content').find('.well');

  articles.each(function() {
    const title = $(this)
      .find('h4')
      .text();

    console.log(title);
  });
}

parsePage(1);
