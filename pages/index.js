import MainBody from '../components/mainbody';
import BookSearch from '../components/booksearch';
import PreviewTest from '../components/previewtest';
import PropertyContainerTest from '../components/PropertyContainer/propertycontainertest';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import moment from 'moment';

import {connect} from 'react-redux';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import {fetchProperties, fetchFilters, setSearchBookDate, setSearchFilters, setSearchId, fetchHot} from '../redux/actions/actions';

const useStyle = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down("sm")]: {
			padding: "0 !important",
			margin: 0,
		}
	},
	text: {
		color: "white",
		textAlign: "center",
	},
	prev: {
		overflowY: "scroll",
		height: "34vh",
	},
	topPrev: {
		backgroundColor: "rgb(44, 50, 55)",
	},
	hotPrev: {
		backgroundColor: "rgb(89, 100, 108)",
	},
}));

const index = (props) => {
	const classes = useStyle();
	const [date, setDate] = React.useState({start: props.search.bookDate.start, end: props.search.bookDate.end});
	const [currentLocation, setCurrentLocation] = React.useState(props.currentId);
	const filters = props.filters;
	const [filtered, handleFilter] = React.useState([]);
	const [search, setSearch] = React.useState({id: currentLocation, filters: props.search.filters});
	
	const setFilter = (e) => handleFilter([...filtered, e]);
	const unsetFilter = (e) => handleFilter(filtered.filter(i => i!=e));
	const handleBook = async (locid, id) => {
		await fetch('https://bookmate.herokuapp.com/api/setdate', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				startDate: date.start,
				endDate: date.end,
			}),
		});
		Router.push(`/viewproperty/${locid}/${id}`);
	};
	
	const handleLocation = async (id) => {
		setSearch({id: id, filters: filtered});
	}
	
	const handleSearch = async () => {
		await props.fetchProperties(search.id, filtered, 0);
		setSearch({...search, filters: filtered});
		props.setSearchId(search.id);
		props.setSearchFilters(filtered);
		props.setSearchBookDate(date);
		Router.push('/top');
	}
	
	const topOffers = props.top.properties.map(property => {
		return <PropertyContainerTest
					price={property.price} 
					rating={property.ratings}
					location={property.location}
					amenities={property.amenities}
					imgSrc={property.imgSrc} 
					title={property.title}
					details={property.details}
					moredetails={property.moredetails}
					handleBook={handleBook.bind(this, props.top._id, property._id)}
				/>
	});
	
	const hotOffers = props.hot.slice(0, 3).map(hot => {
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
		<MainBody>
			<Grid className={classes.root} container item xs={12} justify="center" direction="row" spacing={3}>
				<Grid item md={6} xs={12}>
					<h6 className={classes.text}> Hello guest, welcome to bookmate </h6>
					<img src="/welcome-bg.png" className="img img-fluid" />
					<BookSearch 
						filters={filters}
						setFilter={setFilter}
						unsetFilter={unsetFilter}
						filtered={filtered}
						handleLocation={handleLocation}
						setSearch={handleSearch}
						setDate={setDate}
						date={date}
					/>
				</Grid>
				<Grid item md={5} xs={12}>
					<h6 className={classes.text}> Hot offers </h6>
					<PreviewTest className={[classes.hotPrev, classes.prev].join(" ")}>
						{hotOffers}
					</PreviewTest>
					<h6 className={classes.text}> Top Properties </h6>
					<PreviewTest className={[classes.topPrev, classes.prev].join(" ")}>
						{topOffers}
					</PreviewTest>
				</Grid>
			</Grid>
		</MainBody>
	);
}

index.getInitialProps = async ({store, req}) => {
	if (!store.getState().filters.length) await store.dispatch(fetchFilters());
	const address = await fetch('https://bookmate.herokuapp.com/api/location/randomproperty').then(result => result.json()).then(result => result.id);
	const top = await fetch('https://bookmate.herokuapp.com/api/location/fetchproperty', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			index: 0,
			filters: [],
			id: address,
		}),
	}).then(res => res.json()).then(res => res.result);
	if (req || !store.getState().hot.length) await store.dispatch(fetchHot(10));
	
	return {top: top};
}

const mapDispatchToProps = {
	fetchProperties,
	setSearchFilters,
	setSearchBookDate,
	setSearchId,
	fetchHot
}

export default connect(state => ({properties: state.properties, filters: state.filters, search: state.search, hot: state.hot}), mapDispatchToProps)(index);