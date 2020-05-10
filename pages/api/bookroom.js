import database from '../../utils/database';
import {ObjectId} from 'mongodb';
import {withSession} from 'next-session';

const bookRoom = async (req, res) => {
	const {hotelId, locId, propertyDetails, roomDetails, userDetails} = req.body;
	const newBookingId = ObjectId();
	const bookingDetails = {
		hotelid: hotelId,
		bookingId: newBookingId,
		propertyTitle: propertyDetails.title,
		location: propertyDetails.location,
		roomTitle: roomDetails.title,
		amenities: roomDetails.amenities,
		details: roomDetails.details,
		price: roomDetails.price.price,
		ratings: propertyDetails.rating,
		imgSrc: roomDetails.imgSrc,
	}
	const {"Booking from": bFrom, "Booking to": bTo, "Payment method": payment, Requests, ...newUserDetails} = userDetails;
	req.session.user.details = newUserDetails;
	await database().then(db => {
		db.collection('bookings').updateOne(
			{
				_id: ObjectId(hotelId),
			},
			{
				$push: {
					records: {
						bookingId: newBookingId,
						room: {
							...roomDetails,
						},
						property: {
							...propertyDetails,
						},
						user: {
							...userDetails,
						}
					}
				}
			},
			{
				upsert: true,
			}
		);
		if (!req.session.user.isGuest) {
			db.collection('users').updateOne(
				{
					_id: ObjectId(req.session.user.id),
				},
				{
					$push: {
						bookings: bookingDetails,
					}
				},
				{
					upsert: true,
				}
			);
		} else {
			req.session.user.bookings.push(bookingDetails);
		}			
		db.collection('locations').updateOne(
			{
				_id: ObjectId(locId),
				"properties._id": ObjectId(hotelId),
			},
			{
				$inc: {
					"properties.$.rooms.$[elem].state.available": -1,
				}
			},
			{
				arrayFilters: [
					{
						"elem._id": ObjectId(roomDetails._id)
					}
				],
			}
		);
	});
	res.json({status: "ok", bookingId: newBookingId, hotelId: hotelId});
}

export default withSession(bookRoom, {name: 'bookMate'});