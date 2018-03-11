const fetch = require('node-fetch');

module.exports.getNewsFeedPageHTML = async function(pageNumber) {
  return getPageHTML(`http://www.tneu.edu.ua/news/page/${pageNumber}`);
};

module.exports.getNewsArticlePageHTML = function(url) {
  return getPageHTML(url);
};

async function getPageHTML(url) {
  return fetch(url).then(resp => resp.text());
}

getPageHTML('http://www.tneu.edu.ua/news/12881-5-liutogo.html').then(console.log);
