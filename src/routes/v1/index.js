const express = require('express');
const { BookingController } = require('../../controllers/index')

const router = express.Router();

const bookingController = new BookingController();

// Booking
router.post('/booking', bookingController.create);
router.post('/publish', bookingController.sendMessageToQueue);


module.exports = router;