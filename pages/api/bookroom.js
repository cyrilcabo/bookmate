import database from '../../utils/database';
import {ObjectId} from 'mongodb';

export const config = {
	api: {
		bodyParser: false,
	},
}

const bookRoom = async (req, res) => {
	//Get user details
	const {userDetails} = req.body;
	//Get selected property details
	const {locId, property, room} = req.session.currentBooking;
	//Generate a random booking id
	const newBookingId = ObjectId();
	
	//Validate if request is valid
	const {_id} = req.user || req.session.user; 
	if (!(room._id && property._id && locId && _id && userDetails["First Name"])) {
		res.json({status: 'err', msg: 'Invalid request.'});
		res.end();
	}

	//Extract user information
	const {"Booking from": bFrom, "Booking to": bTo, "Payment method": payment, Requests, ...newUserDetails} = userDetails;

	//Checks if user has paid
	const paid = req.session.currentBooking[req.session.currentBooking.paymentId];
	
	const Status = paid ?"Paid" :"Unpaid";

	//Set booking details
	const bookingDetails = {
		hotelid: property._id,
		bookingId: newBookingId,
		propertyTitle: property.title,
		location: property.location,
		roomTitle: room.title,
		amenities: room.amenities,
		details: room.details,
		price: room.price,
		pax: room.pax,
		size: room.size,
		ratings: room.rating,
		imgSrc: room.imgSrc,
		date: {
			from: bFrom,
			to: bTo,
		},
		Status,
	}
	
	//Set user information
	if (req.isAuthenticated()) req.user.details = newUserDetails;
	else req.session.user.details = newUserDetails;

	//Update booking database with new booking information
	await database().then(db => {
		//Update bookings' master list
		db.collection('bookings').updateOne(
			{
				_id: ObjectId(property._id),
			},
			{
				$push: {
					records: {
						bookingId: newBookingId,
						userId: req.user._id, 
						room: {
							...room,
						},
						property: {
							...property,
						},
						user: {
							...userDetails,
							Status,
						}
					}
				}
			},
			{
				upsert: true,
			}
		);
		//Update user's list of bookings
		if (req.isAuthenticated()) {
			db.collection('users').updateOne(
				{
					_id: ObjectId(req.user._id),
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
		//Update room state in property	
		db.collection('locations').updateOne(
			{
				_id: ObjectId(locId),
				"properties._id": ObjectId(property._id),
			},
			{
				$inc: {
					"properties.$.rooms.$[elem].state.available": -1,
				}
			},
			{
				arrayFilters: [
					{
						"elem._id": ObjectId(room._id)
					}
				],
			}
		);
	});

	//Reset session current booking
	req.session.currentBooking = {
      bookDate: {
        start: "",
        end: ""
      },
      locId: "",
      property: {},
      room: {},
      paymentId: "",
    }

	res.json({status: "ok", bookingId: newBookingId, hotelId: property._id});
}

export default bookRoom;