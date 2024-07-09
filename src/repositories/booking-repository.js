const { Booking } = require('../models/index')
const { StatusCodes } = require('http-status-codes')
const { ValidationError, AppError } = require('../utils/errors/index');

class BookingRepository {
    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'Some issue in creating a Booking',
                StatusCodes.INTERNAL_SERVER_ERROR,                
            )
        }
    }

    async update(bookingId, data){
        try {
            const booking = await Booking.findByPk(bookingId);
            if (data.status) {
               booking.status = data.status; 
            }
            await booking.save();
            return booking;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            console.log(error)
            throw new AppError(
                'RepositoryError',
                'Cannot update Booking',
                'Some issue in updating the Booking',
                StatusCodes.INTERNAL_SERVER_ERROR,                
            )
        }
    }    
}

module.exports = BookingRepository;