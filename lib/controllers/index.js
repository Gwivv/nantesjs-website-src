'use strict';

var path = require('path'),
    fs = require('fs'),
    config = require('../config/config');

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      console.log("Error rendering partial '" + requestedView + "'\n", err);
      res.status(404);
      // res.send(404);
      res.render("404.html");
    } else {
      res.send(html);
    }
  });
};

/**
 * Send md file, or 404 if it doesn't exist
 */
exports.md = function(req, res) {
    var stripped = req.url;
    var requestedFile = path.join(config.root + config.md, stripped);
    console.log("requestedFile=",requestedFile);
    if (fs.existsSync(requestedFile)) {
        res.sendfile(requestedFile);
    } else {
        res.send(null);
    }
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  res.render('index');
};
