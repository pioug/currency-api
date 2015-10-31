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

server.method('getRate', (from, to, next) => {
  rate.scrap(from, to)
    .then((data) => next(null, data))
    .catch((err) => next(err));
}, {
    cache: {
      expiresIn: 24 * 60 * 60 * 1000,
      generateTimeout: 30 * 1000,
      staleIn: 30 * 60 * 1000,
      staleTimeout: 100
    }
  }
);

server.route({
  method: 'GET',
  path:'/v1/currencies',
  handler: (request, reply) => reply(currencies.list).etag(currencies.etag)
});

server.route({
  method: 'GET',
  path:'/v1/rate/{from}/{to}',
  handler: (request, reply) => {
    let from = request.params.from,
      to = request.params.to;
    server.methods.getRate(from, to, (err, result) => reply(err || result));
  },
  config: {
    cache: {
      privacy: 'public',
      expiresIn: 60 * 60 * 1000
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
