'use strict';

const Hapi = require('hapi'),
  currencies = require('./currencies.js'),
  rate = require('./rate.js'),

  server = new Hapi.Server({
    connections: {
      routes: {
        cors: true
      }
    }
  });

server.connection({
  host: '0.0.0.0',
  port: 3000
});

server.route({
  method: 'GET',
  path:'/v1/currencies',
  handler: function (request, reply) {
    reply(currencies.list)
      .etag(currencies.etag);
  }
});

server.route({
  method: 'GET',
  path:'/v1/rate/{from}/{to}',
  handler: function (request, reply) {
    rate
      .scrap(request.params.from, request.params.to)
      .then(reply);
  },
  config: {
    cache: {
      privacy: 'public',
      expiresIn: 60 * 60 * 1000
    }
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
