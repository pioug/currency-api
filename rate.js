'use strict';

const cheerio = require('cheerio'),
  request = require('request-promise');

function scrap(from, to) {
  return request({
    uri: 'http://www.xe.com/currencyconverter/convert/?Amount=1&From=' + from + '&To=' + to,
    transform: cheerio.load
  }).then(function($) {
    let rate = parseFloat($('.uccRes td:last-of-type').text().replace(/,/g,'')),
      date = new Date($('.uccMMR a').text());
    return {
      from: from,
      to: to,
      rate: rate,
      timestamp: date
    };
  });
}

module.exports = {
  scrap: scrap
};
