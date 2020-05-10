import MainBody from '../components/mainbody';
import RoomDetails from '../components/Booking/roomdetails';
import BookingForm from '../components/bookingform';
import Grid from '@material-ui//core/Grid';
import Typography from '@material-ui//core/Typography';
import Divider from '@material-ui//core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import Router from 'next/router';
import {connect} from 'react-redux';
import fetch from 'isomorphic-unfetch';
import moment from 'moment';

import {fetchUser} from '../redux/actions/actions';

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
	const {room, property, locId} = props.currentBooking;
	const {startDate, endDate} = props.currentBooking.bookDate;
	const [date, setDate] = React.useState({start: startDate, end: endDate});
	
	console.log(props.currentBooking)
	
	const confirmBooking = async (userDetails, paymentMode) => {
		await fetch('https://bookmate.herokuapp.com/api/bookroom', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				hotelId: property._id,
				locId: locId,
				roomDetails: room,
				propertyDetails: property,
				userDetails: {
					...userDetails,
					"Payment method": paymentMode,
					"Booking from": moment(date.start).format("MMMM DD, YYYY"),
					"Booking to": moment(date.end).format("MMMM DD, YYYY"),
				},
				userId: "cyrilcabo123",
			})
		}).then(res => res.json()).then(res => {
			Router.push(`/bookings/${res.hotelId}/${res.bookingId}`);
		});
	}
	return (
		<MainBody>
			<Grid container className={classes.root} item xs={12} spacing={2} justify="center">
				<Grid item xs={12}>
					<Typography className={classes.title}> Review Booking </Typography>
					<Divider className={classes.divider} />
				</Grid>
				<Grid item xs={12} md={6}>
					<RoomDetails booking={props.currentBooking}/>
				</Grid>
				<Grid item xs={12} md={5}>
					<BookingForm 
						confirmBooking={confirmBooking} 
						date={date}
						setDate={setDate} 
						user={props.user}
						roomPrice={room.price}
					/>
				</Grid>
			</Grid>
		</MainBody>
	);
}

ConfirmBooking.getInitialProps = async ({req, store}) => {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
	if (!store.getState().user.id) await fetch('https://bookmate.herokuapp.com/api/fetchuser', {
		'Credentials': 'include',
		'headers': {...cookie},
	}).then(res => res.json()).then(user => store.dispatch(fetchUser(user)));
	const result = await fetch('https://bookmate.herokuapp.com/api/getselectedroom', {
		'Credentials': 'include',
		'headers': {
			...cookie,
		}
	}).then(res => res.json());
	return {currentBooking: result.booking}
}

export default connect(state => ({user: state.user}))(ConfirmBooking);