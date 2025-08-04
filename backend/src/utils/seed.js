const { Movie, Theater, Show, User } = require('../models');

const seedDatabase = async () => {
  try {
    // Storing passwords in plaintext (bcrypt removed)
    const adminPassword = 'admin123';
    const userPassword = 'user123';
    await User.create({ name: 'Admin User', email: 'admin@app.com', password: adminPassword, role: 'admin' });
    await User.create({ name: 'Regular User', email: 'user@app.com', password: userPassword, role: 'user' });

    const movie1 = await Movie.create({ title: 'Kalki 2898-AD', synopsis: 'A modern-day avatar of Vishnu...', release_date: '2024-06-27', duration_minutes: 181, poster_url: 'https://placehold.co/400x600/1a202c/ffffff?text=Kalki+2898-AD', genre: 'Sci-Fi/Action', rating: 4.5 });
    const movie2 = await Movie.create({ title: 'Kantara', synopsis: 'A fiery young man clashes...', release_date: '2022-09-30', duration_minutes: 150, poster_url: 'https://placehold.co/400x600/1a202c/ffffff?text=Kantara', genre: 'Action/Thriller', rating: 4.8 });

    const theater1 = await Theater.create({ name: 'Balaji Cinema', city: 'Tumakuru', address: 'BH Road, Tumakuru' });
    const theater2 = await Theater.create({ name: 'Gayathri Mini Theatre', city: 'Tumakuru', address: 'Ashok Nagar, Tumakuru' });

    const today = new Date('2025-07-28T00:00:00');
    const createShowTime = (hours, minutes) => {
        const showTime = new Date(today);
        showTime.setHours(hours, minutes, 0, 0);
        return showTime;
    };

    await Show.bulkCreate([
      { movie_id: movie1.movie_id, theater_id: theater1.theater_id, screen_name: 'Screen 1', show_time: createShowTime(10, 0), base_price: 180 },
      { movie_id: movie1.movie_id, theater_id: theater2.theater_id, screen_name: 'Audi A', show_time: createShowTime(11, 0), base_price: 150 },
      { movie_id: movie2.movie_id, theater_id: theater2.theater_id, screen_name: 'Audi B', show_time: createShowTime(18, 0), base_price: 160 },
    ]);
  } catch (error) {
      console.error("Error seeding database:", error);
  }
};
module.exports = seedDatabase;