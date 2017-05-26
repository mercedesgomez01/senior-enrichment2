'use strict';

// const db = require('../db');
var db = require('../index.js');
const DataTypes = db.Sequelize;

//module.exports = db.define('artist', {
module.exports = db.define('academy', {

  name: {
    type: DataTypes.STRING(1e4), // eslint-disable-line new-cap
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  }

}, {

  instanceMethods: {
    getCampuses: function () {
      //return db.model('album').findAll({
      return db.model('campus').findAll({
        include: [{
          //model: db.model('song'),
          model: db.model('user'),
            include: [{
            //model: db.model('artist'),
              model: db.model('academy'),
              where: { id: this.id } // makes this entire query an inner join
          }]
        }]
      });
    },
    toJSON: function () {
      //Return a shallow clone so toJSON method of the nested models can be called recursively.
      return Object.assign({}, this.get());
    }
  }

});