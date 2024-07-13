const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');
const bookingService = new BookingService();

class BookingController {
    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const payload = { 
            data: {
                subject: 'This is a notif from queue',
                content: 'Some queue will subscribe to this',
                recepientEmail: 'prashantrawat2com@gmail.com',
                notificationTime: '2024-07-13T22:20:04',
            },
            service: 'CREATE_TICKET',
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(200).json({
            message: 'Successfully published the event',
        });
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                msg: 'Sucessfully created booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                msg: error.msg,
                success: false,
                err: error.explanation,
                data: {}
            })
        } 
    }
}

module.exports = BookingController;