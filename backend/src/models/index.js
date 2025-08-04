const Movie_idx = require('./movie.model');
const Theater_idx = require('./theater.model');
const Show_idx = require('./show.model');
const User_idx = require('./user.model');
const Booking_idx = require('./booking.model');
const BookingSeat_idx = require('./bookingSeat.model');
const Review_idx = require('./review.model');

Theater_idx.hasMany(Show_idx, { foreignKey: 'theater_id' });
Show_idx.belongsTo(Theater_idx, { foreignKey: 'theater_id' });
Movie_idx.hasMany(Show_idx, { foreignKey: 'movie_id' });
Show_idx.belongsTo(Movie_idx, { foreignKey: 'movie_id' });
User_idx.hasMany(Booking_idx, { foreignKey: 'user_id' });
Booking_idx.belongsTo(User_idx, { foreignKey: 'user_id' });
Show_idx.hasMany(Booking_idx, { foreignKey: 'show_id' });
Booking_idx.belongsTo(Show_idx, { foreignKey: 'show_id' });
Booking_idx.hasMany(BookingSeat_idx, { foreignKey: 'booking_id' });
BookingSeat_idx.belongsTo(Booking_idx, { foreignKey: 'booking_id' });
User_idx.hasMany(Review_idx, { foreignKey: 'user_id' });
Review_idx.belongsTo(User_idx, { foreignKey: 'user_id', attributes: ['name'] });
Movie_idx.hasMany(Review_idx, { foreignKey: 'movie_id' });
Review_idx.belongsTo(Movie_idx, { foreignKey: 'movie_id' });

module.exports = { Movie: Movie_idx, Theater: Theater_idx, Show: Show_idx, User: User_idx, Booking: Booking_idx, BookingSeat: BookingSeat_idx, Review: Review_idx };
