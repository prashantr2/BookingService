const express = require('express');
const { BookingController } = require('../../controllers/index')

const router = express.Router();

// Booking
router.post('/booking', BookingController.create);


module.exports = router;