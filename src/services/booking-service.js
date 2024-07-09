const { BookingRepository } = require('../repositories/index');
const { ServiceError } = require('../utils/errors/index');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');

class BookingsService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }
    
    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `http://${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data; 
            const flightPrice = flightData.price;
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError(
                    'Something went wrong in booking process',
                    'Insufficient number of seats in flight',
                );
            }
            const totalCost = flightPrice * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayload);
            
            const updateFlightRequestURL = `http://${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`
            await axios.patch(updateFlightRequestURL, 
                { 
                    totalSeats: flightData.totalSeats - booking.noOfSeats 
                }
            );
            const finalBooking = await this.bookingRepository.update(booking.id, { 
                status: 'Booked' 
            });
            
            return finalBooking;
        } catch (error) {
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
    
    async updateBooking(bookingId, data) {
        
    }
}

module.exports = BookingsService;