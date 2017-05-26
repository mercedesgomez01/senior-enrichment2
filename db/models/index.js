'use strict';

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is requeired everywhere

const User = require('./user')
const Campus = require('./campus')
const Academy = require('./academy')
const Campuslist = require('./campuslist')

//Form the associations
User.belongsTo(Campus);
Campus.hasMany(User);
User.belongsTo(Academy)

// Song.belongsTo(Album);
User.belongsTo(Campus);
// Album.hasMany(Song);
Campus.hasMany(User);
// Album.belongsTo(Artist); // "Album Artist" is a thing, even if there are
Campus.belongsTo(Academy);  // other artists on the album.


// Artist.belongsToMany(Song, { through: 'artistSong' });
Academy.belongsToMany(User, {through: 'academyUser'});//Define campusUser on /bin/seed
// Song.belongsToMany(Artist, { through: 'artistSong' });
User.belongsTo(Academy);

// Song.belongsToMany(Playlist, { through: 'playlistSong' });
User.belongsToMany(Campuslist, { through: 'campuslistUser'});
// Playlist.belongsToMany(Song, { through: 'playlistSong' });
Campuslist.belongsToMany(User, {through: 'campuslistUser' });


// exported just in case, but can also be fetched via db.model('Album') etc.

module.exports = {
//   Album: Album,
//   Song: Song,
//   Artist: Artist,
//   Playlist: Playlist
Campus: Campus,
User: User,
Academy: Academy,
Campuslist: Campuslist
};

