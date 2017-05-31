'use strict';

const express = require('express');
const mime = require('mime');
const api = express.Router();
const models = require('../../db/models');
const Campus = models.Campus;
module.exports = api;

api.get('/', function (req, res, next) {
  Campus.scope('defaultScope', 'userIds').findAll({ where: req.query })
  .then(campuses => res.json(campuses))
  .catch(next);
});

api.param('campusId', function (req, res, next, id) {
  Campus.scope('defaultScope', 'populated').findById(id)
  .then(function (album) {
    if (!campus) {
      const err = Error('Campus not found');
      err.status = 404;
      throw err
    }
    req.campus = campus;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

api.get('/:campusId', function (req, res) {
  res.json(req.campus);
});

api.get('/:campusId/image', function (req, res, next) {
  res.redirect(`/api/users/${req.campus.users[0].id}/image`)
});

api.get('/:campusId/users/', function (req, res) {
  res.json(req.album.users);
});

api.get('/:campusId/users/:userId', function (req, res) {
  const userToSend = req.campus.users.find(user => {
    return user.id === Number(req.params.userId);
  });
  if (!userToSend) return res.sendStatus(404);
  res.json(userToSend);
});