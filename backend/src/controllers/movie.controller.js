const { Movie: Movie_Ctrl, Review: Review_Ctrl, User: User_Ctrl } = require('../models');

exports.findAll = async (req, res) => { try { const movies = await Movie_Ctrl.findAll({ order: [['release_date', 'DESC']] }); res.status(200).send(movies); } catch (err) { res.status(500).send({ message: err.message }); } };

exports.findOne = async (req, res) => { try { const movie = await Movie_Ctrl.findByPk(req.params.id, { include: [{ model: Review_Ctrl, include: [{ model: User_Ctrl, attributes: ['name'] }] }] }); if (movie) { res.status(200).send(movie); } else { res.status(404).send({ message: 'Movie not found.' }); } } catch (err) { res.status(500).send({ message: err.message }); } };

exports.adminAddMovie = async (req, res) => {
  const { title, synopsis, release_date, duration_minutes, genre, rating } = req.body;

  if (!req.file) {
    return res.status(400).send({ message: 'Poster image is required.' });
  }
  if (!title) {
    return res.status(400).send({ message: 'Title is a required field.' });
  }
  
  const poster_url = `/uploads/posters/${req.file.filename}`;
  
  try {
    const newMovie = await Movie_Ctrl.create({
      title,
      synopsis,
      release_date,
      duration_minutes,
      genre,
      rating,
      poster_url, 
    });
    res.status(201).send(newMovie);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// --- Admin Update Movie ---
exports.adminUpdateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, synopsis, release_date, duration_minutes, genre, rating } = req.body;

  try {
    const movie = await Movie_Ctrl.findByPk(id);
    if (!movie) {
      return res.status(404).send({ message: "Movie not found." });
    }

    // Update text fields from the form
    movie.title = title;
    movie.synopsis = synopsis;
    movie.release_date = release_date;
    movie.duration_minutes = duration_minutes;
    movie.genre = genre;
    movie.rating = rating;

    // If a new poster image was uploaded, update the URL
    if (req.file) {
      movie.poster_url = `/uploads/posters/${req.file.filename}`;
    }

    await movie.save();
    res.status(200).send(movie);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// --- Admin Delete Movie ---
exports.adminDeleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie_Ctrl.findByPk(id);
    if (!movie) {
      return res.status(404).send({ message: "Movie not found." });
    }

    await movie.destroy();
    res.status(200).send({ message: "Movie deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};