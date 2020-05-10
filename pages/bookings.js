import MainBody from '../components/mainbody';
import PreviewTest from '../components/previewtest';
import PropertyContainerTest from '../components/PropertyContainer/propertycontainertest';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import {connect} from 'react-redux';

import {fetchUser} from '../redux/actions/actions';

const useStyle = makeStyles({
	root: {
		minHeight: '60vh',
		display: "flex",
		justifyContent: "center",
	},
	propertycontainer: {
		width: '100%',
	},
	header: {
		padding: 20,
		backgroundColor: "black",
	},
	headerText: {
		fontSize: "2rem",
	},
	buttonColor: {
		borderColor: "green",
		color: "green",
		'&:hover': {
			borderColor: "green !important",
		},
	},
});

const Bookings = (props) => {
	const classes = useStyle();
	const handleBook = (hotelid, bookingid) => {
		Router.push(`/bookings/${hotelid}/${bookingid}`);
	}
	const bookings = props.user.bookings.map((booking) => {
		return <PropertyContainerTest
					type="VIEW"
					price={{price: booking.price}} 
					rating={booking.ratings}
					location={booking.location}
					amenities={booking.amenities}
					imgSrc={booking.imgSrc} 
					title={booking.propertyTitle}
					details={[booking.roomTitle, "May 2, 2020 - May 3, 2020"]}
					handleBook={handleBook.bind(this, booking.hotelid, booking.bookingId)}
				/>
	});
	return (
		<MainBody className={classes.root}>
			<Grid item xs={12} container justify="center" spacing={2} style={{height: '100%'}}>
				<Grid item xs={12}>
					<span style={{fontSize: '2rem', color: 'white'}}> Bookings </span>
					<Divider style={{backgroundColor: 'white'}}/>
				</Grid>
				<Grid item xs={12} container justify="center" spacing={2}>
					<PreviewTest className={classes.propertycontainer}>
						{bookings}
					</PreviewTest>
				</Grid>
			</Grid>
		</MainBody>
	);
}

Bookings.getInitialProps = async ({store, req}) => {
	const cookie = (req) ?{'Cookie': req.headers.cookie} :null;
	const state = store.getState();
	if (!state.user.id) {
		await fetch('https://bookmate.herokuapp.com/api/fetchuser', {
			headers: {
				...cookie,
			}
		}).then(response => response.json()).then((user) => {
			store.dispatch(fetchUser(user))
		});
	}
}

export default connect(state => ({user: state.user}))(Bookings);