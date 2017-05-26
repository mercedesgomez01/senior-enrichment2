 'use strict';

const express = require('express');
//const router = new express.Router();
const api = new express.Router();
//const models = require('../../db/models');
const models = require('../../db/models');
// const Artist = models.Artist;
const Academy = models.Academy;
module.exports = api;

api.get('/', function (req, res, next) {
  //Artist.findAll({ where: req.query })
  Academy.findAll({ where: req.query })
  //.then(artists => res.json(artists))
  .then(academies => res.json(academies))
  .catch(next);
});

api.param('academyId', function(req, res, next, id){
  Academy.findById(id)
  .then(academy => {
    if(!academy){
      const err = Error('Academy not found');
      err.status = 404;
      throw err
    }
    req.academy = academy;
    next();
    return null;
  })
  .catch(next);
})

api.get('/:academyId', function(req, res){
  res.json(req.academy)
})

api.get('/:academyId/campuses', function (req, res, next) {
  req.academy.getCampuses() // instance method, check it out in the model
  .then(campuses => res.json(campuses))
  .catch(next);
});

api.get('/:academyId/campuses', function (req, res, next) {
  req.academy.getUsers({
    include: [Academy]
  })
  .then(users => res.json(users))
  .catch(next);
});