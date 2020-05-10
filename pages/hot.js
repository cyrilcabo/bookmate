import MainBody from '../components/mainbody';
import PreviewTest from '../components/previewtest';
import PropertyContainerTest from '../components/PropertyContainer/propertycontainertest';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import {connect} from 'react-redux';
import {fetchHot} from '../redux/actions/actions';

const useStyle = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
	},
	display: {
		width: "100%",
		height: "35vh",
		marginBottom: 15,
	},
	body: {
		height: "",
		width: "100%",
		backgroundColor: "#343a40",
	},
});

const Hot = (props) => {
	const classes = useStyle();
	const {start, end} = props.search.bookDate;
	const handleBook = async (locid, id) => {
		await fetch('https://bookmate.herokuapp.com/api/setdate', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				startDate: start,
				endDate: end,
			}),
		});
		Router.push(`/viewproperty/${locid}/${id}`);
	};
	
	const hotOffers = props.hot.map(hot => {
		const {property} = hot;
		return <PropertyContainerTest
					price={property.price} 
					rating={property.ratings}
					location={property.location}
					amenities={property.amenities}
					imgSrc={property.imgSrc} 
					title={property.title}
					details={property.details}
					moredetails={property.moredetails}
					handleBook={handleBook.bind(this, hot._id, property._id)}
				/>
	});
	
	return (
		<MainBody className={classes.root}>
			<Grid container xs={12} md={10} fullWidth>
				<img src="/offers-bg.png" className={classes.display} />
				<PreviewTest className={classes.body}>
					{hotOffers}
				</PreviewTest>
			</Grid>
		</MainBody>
	);
}

Hot.getInitialProps = async ({store, req}) => {
	if (req || !store.getState().hot.length) {
		await store.dispatch(fetchHot(10));
	}
}

export default connect(state => ({hot: state.hot, search: state.search}))(Hot);