const express_movie = require('express');
const router_movie = express_movie.Router();
const movieController = require('../controllers/movie.controller');
router_movie.get('/', movieController.findAll);
router_movie.get('/:id', movieController.findOne);
module.exports = router_movie;