var mongooseReservation = require('mongoose');

mongooseReservation.Promise = global.Promise;
mongooseReservation.connect('mongodb://localhost:27017/ReservationApp');

exports.module = {mongooseReservation}