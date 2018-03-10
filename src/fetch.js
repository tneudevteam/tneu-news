const fetch = require('node-fetch');

module.exports.getPageHTML = async function(url) {
  return fetch(url).then(resp => resp.text());
};
