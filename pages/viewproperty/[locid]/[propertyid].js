import MainBody from '../../../components/mainbody';
import PropertyHeader from '../../../components/PropertyView/propertyheader';
import PropertyTitle from '../../../components/PropertyView/propertytitle';
import PropertyAmenities from '../../../components/PropertyView/propertyamenities';
import PropertyRooms from '../../../components/PropertyView/propertyrooms';
import PropertyContacts from '../../../components/PropertyView/propertycontacts';
import PropertyPolicies from '../../../components/PropertyView/propertypolicies';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';

import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

const useStyle = makeStyles({
	root: {
		padding: 0,
		margin: 0,
	},
});

const PropertyView = (props) => {
	const classes = useStyle();
	const property = props.property;
	const handleBook = async (room) => {
		const {rooms, images, imgSrc, price, ...newProperty} = property;
		const {state, ...newRoom} = room;
		await fetch('http://localhost:3000/api/selectroom', {
			'method': 'POST',
			'headers': {
				'content-type': 'application/json'
			},
			'body': JSON.stringify({
				locId: props.locId,
				property: newProperty,
				room: newRoom,
			})
		}).then(res => res.json()).then(res => {
			if (res.status === "ok") Router.push('/confirmbooking');
		});
	}
	return (
		<MainBody>
			<Grid item xs={12} className={classes.root} container justify="center" spacing={2}>
				<Grid item container justify="center" xs={12} md={11}>
					<PropertyHeader images={property.images} />
				</Grid>
				<Grid item xs={12} md={7}>
					<PropertyTitle 
						title={property.title} 
						details={property.details} 
						location={property.location} 
					/>
				</Grid>
				<Grid className={classes.root} item xs={12} md={4}>
					<PropertyAmenities amenities={property.amenities}/>
				</Grid>
				<Grid className={classes.root} item xs={12} md={7}>
					<PropertyRooms rooms={property.rooms} handleBook={handleBook} />
				</Grid>
				<Grid className={classes.root} item xs={12} md={4}>
					<PropertyContacts contacts={property.contacts} />
					<PropertyPolicies policies={property.policies} />
				</Grid>
			</Grid>
		</MainBody>
	);
}

PropertyView.getInitialProps = async ({req, query}) => {
	const path = (req) ?query :Router.query;
	const result = await fetch(`http://localhost:3000/api/viewproperty/${path.locid}/${path.propertyid}`).then(res => res.json());
	return {property: result.property, locId: result.locId};
}

export default PropertyView;