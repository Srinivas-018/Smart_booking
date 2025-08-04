const express_show = require('express');
const router_show = express_show.Router();
const showController = require('../controllers/show.controller');
router_show.get('/', showController.findShowsForMovie);
module.exports = router_show;