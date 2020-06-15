import database from '../../utils/database';

import {ObjectId} from 'mongodb';

import moment from 'moment';

const fetchBooking = async (req, res) => {
	const {hotelid, bookingid} = req.query;
	const booking = await database().then(db => {
		return db.collection('bookings').find({_id: ObjectId(hotelid)}).project({
			records: {
				$elemMatch: {
					bookingId: ObjectId(bookingid),
				}
			}
		}).toArray();
	});
	const resultBooking = {
		...booking[0].records[0],
		user: {
			...booking[0].records[0].user,
			"Status": (moment().isAfter(moment(booking[0].records[0].user["Booking to"]), "day")) ?"Done" :booking[0].records[0].user["Status"],
		}
	}
	res.json(resultBooking);
}

export default fetchBooking;