'use strict'
//const router = require('express').Router();
const api = require('express').Router()
// const db = require('../db')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

// router.use('/artists', require('./artists'));
api.use('/', require('./academies'));
// router.use('/albums', require('./albums'));
api.use('/campuses', require('./campuses'));
// router.use('/playlists', require('./playlists'));
api.use('/campuslists', require('./campuslists'));
// router.use('/songs', require('./songs'));
api.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
api.use(function (req, res) {
  res.status(404).end();
});

//module.exports = router;
module.exports = api
