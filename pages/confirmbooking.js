import RoomDetails from '../components/Booking/roomdetails';
import BookingForm from '../components/bookingform';
import PageTemplate from '../components/PageTemplate/pagetemplate';
import Grid from '@material-ui//core/Grid';
import Typography from '@material-ui//core/Typography';
import Divider from '@material-ui//core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import Router from 'next/router';
import {connect} from 'react-redux';
import fetch from 'isomorphic-unfetch';
import moment from 'moment';

import {fetchUser, setCurrentBooking} from '../redux/actions/actions';
import {apiGetSelectedRoom, apiFetchUser, apiBookRoom} from '../utils/api';

const useStyle = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down("sm")]: {
			padding: 0,
			margin: 0,
		},
	},
	divider: {
		backgroundColor: "gray",
	},
	title: {
		fontSize: "2rem",
		color: "white",
	},
}));

const ConfirmBooking = (props) => {
	const classes = useStyle();
	const {room, property, locId, bookDate} = props.user.currentBooking;
	const {start, end} = bookDate;
	const [date, setDate] = React.useState({start: start, end: end});
	const [confirming, setConfirming] = React.useState(false);
	
	const confirmBooking = async (userDetails, paymentMode) => {
		setConfirming(true);
		await apiBookRoom({
			...userDetails,
			"Payment method": paymentMode,
			"Booking from": moment(date.start).format("MMMM DD, YYYY"),
			"Booking to": moment(date.end).format("MMMM DD, YYYY"), 

		}).then(res => res.json()).then(res => {
			Router.push(`/bookings/viewbooking?hotelid=${res.hotelId}&bookingid=${res.bookingId}`);
		});
	}

	return (
		<Grid container className={classes.root} item xs={12} justify="center">
			<PageTemplate title={"Review booking"}>
				<Grid item xs={12} container justify="space-around" spacing={2}>
					<Grid item xs={12} md={6}>
						<RoomDetails property={property} room={room}/>
					</Grid>
					<Grid item xs={12} md={6}>
						<BookingForm 
							confirmBooking={confirmBooking} 
							date={date}
							setDate={setDate} 
							user={props.user}
							price={room.price}
							confirming={confirming}
						/>
					</Grid>
				</Grid>
			</PageTemplate>
		</Grid>
	);
}

ConfirmBooking.getInitialProps = async ({req, store, res}) => {
	if (req) {
		const {property, locId, room, bookDate} = req.session.currentBooking;
		if (!locId && !property._id && !room._id && !bookDate.start && !bookDate.end) {
			res.writeHead(301, {location: '/'});
			res.end();
		}
	}
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
	if (!store.getState().user.id) await apiFetchUser(cookie).then(res => res.json()).then(user => store.dispatch(fetchUser(user)));
	await apiGetSelectedRoom(cookie).then(res => res.json()).then((booking) => store.dispatch(setCurrentBooking(booking.booking)));
}

export default connect(state => ({user: state.user}))(ConfirmBooking);