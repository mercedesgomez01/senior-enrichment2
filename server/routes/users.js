'use strict';

const express = require('express');
const api = express.Router();
const mime = require('mime');
const chalk = require('chalk');
const urlParse = require('url').parse;
const models = require('../../db/models');
const User = models.User;
const request = require('request');
//const musicMetadata = require('musicmetadata') //need to figure this out, may be part of seed
const fs = require('fs')

module.exports = api;

api.get('/', function (req, res, next) {
  User.scope('defaultScope', 'populated').findAll({ where: req.query })
  .then(users => res.json(users))
  .catch(next);
});

api.param('userId', function (req, res, next, id) {
  User.scope('defaultScope', 'populated').findById(id)
  .then(user => {
    if (!user) {
      const err = Error('User not found');
      err.status = 404;
      throw err
    }
    req.user = user;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

api.get('/:userId', function (req, res) {
  res.json(req.user);
});

function open(url) {
  const parsed = urlParse(url)
  return parsed.protocol === 'file:'?
    fs.createReadStream(decodeURIComponent(parsed.path))
    : request(url)
}

api.get('/:userId/image', function (req, res, next) {                    //need to figure out musicMetadata NPM package
  musicMetadata(open(req.user.url), function (err, metadata) {
    if (err) { return next(err) }
    const pic = metadata.picture[0]
    pic? res
      .set('Content-Type', mime.lookup(pic.format))
      .send(pic.data)
      : res.redirect('/default-campus.jpg')
  })
});

api.get('/:userId/audio', function (req, res, next) {
  const url = urlParse(req.user.url)
  url.protocol === 'file:'?
    res.sendFile(decodeURIComponent(url.path))
    : res.redirect(req.user.url)
});
