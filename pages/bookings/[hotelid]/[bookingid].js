import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import MainBody from '../../../components/mainbody';
import RoomDetails from '../../../components/Booking/roomdetails';
import UserDetails from '../../../components/Booking/userdetails';

import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

const ViewBooking = (props) => {
	return (
		<MainBody>
			<Grid item xs={12} container justify="center" spacing={1}>
				<Grid item xs={12}>
					<span style={{fontSize: '2rem', color: 'white'}}> Bookings / Booking ID: {props.bookingId} </span>
					<Divider style={{backgroundColor: 'white'}}/>
				</Grid>
				<Grid item xs={12} container justify="center" spacing={2}>
					<Grid item xs={12} md={6}>
						<RoomDetails booking={props.booking} />
					</Grid>
					<Grid item xs={12} md={5}>
						<UserDetails user={props.user} />
					</Grid>
				</Grid>
			</Grid>
		</MainBody>
	);
}

ViewBooking.getInitialProps = async ({req, query}) => {
	const params = (req) ?query :Router.query;
	const {hotelid, bookingid} = params;
	const bookingDetails = await fetch(`https://bookmate.herokuapp.com/api/fetchbooking?hotelid=${hotelid}&bookingid=${bookingid}`).then(res => res.json());
	return {
		bookingId: bookingDetails.bookingId,
		booking: {
			property: bookingDetails.property,
			room: bookingDetails.room,
		},
		user: bookingDetails.user,
	};
}

export default ViewBooking;
