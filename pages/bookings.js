//Custom components
import PreviewTest from '../components/Preview/previewtest';
import PropertyContainerTest from '../components/PropertyContainer/propertycontainertest';
import PageTemplate from '../components/PageTemplate/pagetemplate';

//Material components
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Utils
import makeStyles from '@material-ui/styles/makeStyles';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import {connect} from 'react-redux';
import moment from 'moment';

//Redux actions
import {fetchUser} from '../redux/actions/actions';

//API calls
import {apiFetchUser} from '../utils/api';

const Bookings = (props) => {
	const handleBook = (hotelid, bookingid) => {
		Router.push(`/bookings/viewbooking?hotelid=${hotelid}&bookingid=${bookingid}`);
	}
	const bookings = props.user.bookings.reverse().map((booking, index) => {
		const date = <p style={{margin: 0, textAlign: 'right'}}> {moment(booking.date.from).format("MM/DD/YYYY")} - {moment(booking.date.to).format("MM/DD/YYYY")} </p>
		return <PropertyContainerTest
					key={index}
					type="VIEW"
					price={{price: booking.price}} 
					rating={booking.ratings}
					location={booking.location}
					amenities={booking.amenities}
					imgSrc={booking.imgSrc} 
					title={booking.propertyTitle}
					pax={booking.pax}
					size={booking.size}
					details={booking.details}
					moredetails={date}
					handleBook={handleBook.bind(this, booking.hotelid, booking.bookingId)}
					status={moment().isAfter(moment(booking.date.to), "day") ?"Done" :booking.Status}
				/>
	});
	return (
		<Grid item xs={12} container justify="center">
			<PageTemplate title={"BOOKINGS"}>
				<Grid item xs={12} container justify="center">
					<PreviewTest purpose={"booking"} style={{width: '100%'}}>
						{bookings}
					</PreviewTest>
				</Grid>
			</PageTemplate>
		</Grid>
	);
}

Bookings.getInitialProps = async ({store, req}) => {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
	const state = store.getState();
	if (!state.user.id) {
		await apiFetchUser(cookie).then(response => response.json()).then(async (user) => {
			store.dispatch(fetchUser(user))
		});
	}
}

export default connect(state => ({user: state.user}))(Bookings);