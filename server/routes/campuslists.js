'use strict';

const express = require('express');
// const router = new express.Router();
const api = new express.Router();
const models = require('../../db/models');
const Campuslist = models.Campuslist;
module.exports = api;

api.get('/', function (req, res, next) {
  Campuslist.findAll({ where: req.query })
  .then(campuslists => res.json(campuslists))
  .catch(next);
});

api.post('/', function (req, res, next) {
  Campuslist.create(req.body)
  .then(campuslist => res.status(201).json(campuslist))
  .catch(next);
});

api.param('campuslistId', function (req, res, next, id) {
  Campuslist.scope('populated').findById(id)
  .then(campuslist => {
    if (!campuslist) {
      const err = Error('campuslist not found');
      err.status = 404;
      throw err
    }
    req.campuslist = campuslist;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

api.get('/:campuslistId', function (req, res) {
  res.json(req.campuslist);
});

api.put('/:campuslistId', function (req, res, next) {
  req.campuslist.update(req.body)
  .then(campuslist => res.status(200).json(campuslist))
  .catch(next);
});

api.delete('/:campuslistId', function (req, res, next) {
  req.campuslist.destroy()
  .then(() => res.status(204).end())
  .catch(next);
});

api.get('/:campuslistId/users', (req, res) => res.json(req.campuslist.users));

api.post('/:campuslistId/songs', function (req, res, next) {
  const id = req.body.id || req.body.song.id;
  req.campuslist.addAndReturnUser(id)
  .then(song => res.status(201).json(song))
  .catch(err => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send('User is already in the campuslist.');
    } else {
      return next(err);
    }
  });
});

api.get('/:campuslistId/users/:usersId', function (req, res) {
  const requestedUser = req.campuslist.users.find(function (users) {
    return user.id === Number(req.params.userId);
  });
  if (!requestedUser) res.sendStatus(404);
  else res.json(requestedUser);
});

api.delete('/:campuslistId/users/:userId', function (req, res, next) {
  req.campuslist.removeUser(req.params.userId)
  .then(() => res.sendStatus(204))
  .catch(next);
})