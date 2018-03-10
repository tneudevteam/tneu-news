const fetch = require('node-fetch');

module.exports.getNewsFeedPageHTML = async function(pageNumber) {
  return getPageHTML(`http://www.tneu.edu.ua/news/page/${pageNumber}`);
};

async function getPageHTML(url) {
  return fetch(url).then(resp => resp.text());
}
