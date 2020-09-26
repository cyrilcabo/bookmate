import PropertyHeader from '../components/PropertyView/propertyheader';
import PropertyTitle from '../components/PropertyView/propertytitle';
import PropertyAmenities from '../components/PropertyView/propertyamenities';
import PropertyRooms from '../components/PropertyView/propertyrooms';
import PropertyContacts from '../components/PropertyView/propertycontacts';
import PropertyPolicies from '../components/PropertyView/propertypolicies';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import {apiSetSelectedRoom, apiViewProperty} from '../utils/api';

const useStyle = makeStyles(theme => ({
	root: {
		'&#details': {
			width: '90%',
			justifySelf: 'flex-end',
		},
	},
	header: {
		marginTop: 10,
		[theme.breakpoints.down('sm')]: {
			marginTop: 10,
			backgroundColor: 'black',
			padding: "2px 0px 2px 0px",
		}
	},
	bottomDesign: {
		marginTop: 15,
		marginBottom: -15,
		'& > div.MuiGrid-item': {
			height: 15,
			marginTop: 3,
		}
	},
}));

const PropertyView = (props) => {
	const classes = useStyle();
	const property = props.property;
	const handleBook = async (room) => {
		await apiSetSelectedRoom(room._id).then(res => res.json()).then(res => {
			if (res.status === "ok") Router.push('/confirmbooking');
		});
	}
	return (
		<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
			<Grid item xs={12} md={11} container justify="center">
				<Grid item container justify="center" alignItems="center" className={classes.header} style={{marginBottom: 20}} xs={12} md={11}>
					<PropertyHeader images={property.images} />
				</Grid>
				<Grid item container xs={12} justify="center" spacing={2} style={{marginBottom: 10}}>	
					<Grid item xs={12} md={7}>
						<PropertyTitle 
							title={property.title} 
							details={property.details} 
							location={property.location}
							rating={property.rating} 
						/>
					</Grid>
					<Grid className={classes.root} item xs={12} md={4}>
						<PropertyAmenities amenities={property.amenities}/>
					</Grid>
				</Grid>
				<Grid item xs={12} justify="center" container spacing={2}>
					<Grid className={classes.root} item xs={12} md={7}>
						<PropertyRooms rooms={property.rooms} handleBook={handleBook} />
					</Grid>
					<Grid className={classes.root} item xs={12} md={4}>
						<Grid item id="contacts">
							<PropertyContacts contacts={property.contacts}/>
						</Grid>
						<Grid item>
							<PropertyPolicies policies={property.policies} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={11} container direction="column" className={classes.bottomDesign}>
					<Grid item style={{backgroundColor: '#f3f351'}} />
					<Grid item style={{backgroundColor: '#0a4f4f'}} />
					<Grid item style={{backgroundColor: 'black'}} />
				</Grid>
			</Grid>
			<style jsx global> {`
				body {
					background-image: linear-gradient(to top, #f6ffff, #0a4f4f);
				}
			`} </style>
		</div>
	);
}

PropertyView.getInitialProps = async ({req, query}) => {
	const {locid, propertyid} = query;
	const result = await apiViewProperty(locid, propertyid).then(res => res.json());
	return {property: result.property, locId: result.locId};
}

export default PropertyView;