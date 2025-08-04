const express_theater = require('express');
const router_theater = express_theater.Router();
const { Theater } = require('../models');
router_theater.get('/', async (req, res) => {
    try {
        const theaters = await Theater.findAll();
        res.status(200).send(theaters);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
module.exports = router_theater;