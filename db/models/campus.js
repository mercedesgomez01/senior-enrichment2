'use strict';
var Sequelize = require('sequelize')
// const db = require('../db');
var db = require('../index.js')
const unique = require('./plugins/unique-through')


const DataTypes = db.Sequelize;

// module.exports = db.define('album', {
module.exports = db.define('campus', {

  name: {
    type: DataTypes.STRING, // eslint-disable-line new-cap
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  // artists: unique('artists').through('songs')
  academies: unique('academies').through('users')

}, {

  scopes: {
    //songIds: () => ({
    userIds: () => ({ // function form lets us use to-be-defined models
      include: [{
        // model: db.model('song'),
        model: db.model('user'),
        attributes: ['id']
      }]
    }),
    populated: () => ({ // function form lets us use to-be-defined models
      include: [{
        // model: db.model('song').scope('defaultScope', 'populated'),
        model: db.model('user').scope('defaultScope', 'populated')
      }]
    })
  }

});