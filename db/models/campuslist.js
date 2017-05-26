
'use strict';

// const db = require('../db');
var db = require('../index.js')
const DataTypes = db.Sequelize;
const unique = require('./plugins/unique-through');

//module.exports = db.define('playlist', {
module.exports = db.define('campuslist', {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  //artists: unique('artists').through('songs')
  academies: unique('academies').through('users')

}, {

  scopes: {
    populated: () => ({ // function form lets us refer to undefined models
      include: [{
		//model: db.model('song').scope('defaultScope', 'populated')
        model: db.model('user').scope('defaultScope', 'populated')
      }]
    })
  },
  instanceMethods: {
    addAndReturnUser: function (songId) { // `addSong` doesn't promise a song.
      //songId = String(songId);
	  userId = String(userId);
      //const addedToList = this.addSong(songId);
	  const addedToList = this.addUser(userId);
      //const songFromDb = db.model('song')
	  const userFromDb = db.model('user')
      .scope('defaultScope', 'populated')
	  //.findById(songId);
      .findById(userId);
	  //return DataTypes.Promise.all([addedToList, songFromDb])
      return DataTypes.Promise.all([addedToList, userFromDb])
      //.spread((result, song) => song);
	  spread((result, user) => user);
    }
  }

});