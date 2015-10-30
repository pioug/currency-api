'use strict';

const _ = require('lodash'),
  $ = require('cheerio'),
  xeCurrencies = require('./xe-currencies.json'),
  list = _.map(xeCurrencies, (currency) => {
    let decoded = $('<div>' + currency + '</div>').text(),
      splitted = decoded.split(',');
    return {
      code: splitted.shift(),
      name: splitted.shift(),
      alt: splitted
    };
  }),
  etag = require('crypto').createHash('md5').update(JSON.stringify(list)).digest('hex');

module.exports = {
  etag: etag,
  list: list
};
