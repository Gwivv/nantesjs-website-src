'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/mySkills', api.mySkills);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    // res.send(404);
    res.render("404.html");
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/md/*', index.md);
  app.get('/*', index.index);
};