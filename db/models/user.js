'use strict';

// const db = require('../db');
var db = require('../index.js')
const DataTypes = db.Sequelize; //Usually use var Sequelize = require('sequelize') instead of 'DataTypes'

module.exports = db.define('user', {
  name: {
    type: DataTypes.STRING(1e4), // eslint-disable-line new-cap
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  gender: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING(1e4), // eslint-disable-line new-cap
    allowNull: false
  },
}, {
  defaultScope: {
    attributes: {
      include: ['campusId'], // excluded by default, need for `song.getAlbum()` //user.getCampus()
    },
  },
  scopes: {
    populated: () => ({ // function form lets us use to-be-defined models
      include: [{
        model: db.model('user')
      }]
    })
  },
  instanceMethods: {
    toJSON: function () { // overriding toJSON to prevent url from leaking to client
      const plain = this.get({plain: true});
      delete plain.url;
      return plain;
    }
  }
});