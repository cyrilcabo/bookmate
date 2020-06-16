import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import PageTemplate from '../../components/PageTemplate/pagetemplate';
import RoomDetails from '../../components/Booking/roomdetails';
import UserDetails from '../../components/Booking/userdetails';

import fetch from 'isomorphic-unfetch';
import {connect} from 'react-redux';
import Router from 'next/router';

import {viewBooking} from '../../redux/actions/actions';
import {apiFetchBooking} from '../../utils/api';

const ViewBooking = (props) => {
	const {bookingId, booking, user} = props.viewBooking;
	return (
		<Grid container item xs={12} justify={"center"}>
			<PageTemplate title={"BOOKINGS"}>
				<Grid item xs={12} container justify="space-around" spacing={2}>
					<Grid item xs={12} md={6}>
						<RoomDetails property={booking.property} room={booking.room} />
					</Grid>
					<Grid item xs={12} md={6}>
						<UserDetails user={user} id={bookingId} />
					</Grid>
				</Grid>
			</PageTemplate>
		</Grid>
	);
}

ViewBooking.getInitialProps = async ({req, query, store, res}) => {
	const {hotelid, bookingid} = query;
	const cookie = req ?{Cookie: req.headers.cookie} :null;
	const bookingDetails = await apiFetchBooking(hotelid, bookingid, cookie).then(res => res.json()).then(booking => {
		if (booking.status==="err") {
			if (req)  {
				res.writeHead(301, {location: '/bookings'});
				res.end();
			} else {
				Router.replace('/bookings');
			}
		} else {
			store.dispatch(viewBooking(booking))
		}
	});
}

export default connect(state => ({viewBooking: state.viewBooking}))(ViewBooking);