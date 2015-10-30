'use strict';

const _ = require('lodash'),
  $ = require('cheerio'),
  xeCurrencies = require('./xe-currencies.json'),
  currencies = _.map(xeCurrencies, (currency) => {
    let decoded = $('<div>' + currency + '</div>').text(),
      splitted = decoded.split(',');
    return {
      code: splitted.shift(),
      name: splitted.shift(),
      alt: splitted
    }
  });

module.exports = currencies
