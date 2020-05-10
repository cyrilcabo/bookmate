import MainBody from '../components/mainbody';
import LocationSearch from '../components/Search/locationsearch';
import DatePicker from '../components/Search/datepicker';
import PreviewTest from '../components/previewtest';
import PropertyContainerTest from '../components/PropertyContainer/propertycontainertest';
import FilterSettings from '../components/filtersettings';
import {Grid, FormControl, Button, Typography, Paper} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

import {fetchProperties, setSearchFilters, fetchFilters} from '../redux/actions/actions';

import {connect} from 'react-redux';
import Router from 'next/router';

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center",
	},
	search: {
		marginBottom: 15,
	},
	dateContainer: {
		backgroundColor: "black",
		marginTop: 15,
		width: "100%",
		padding: 5,
	},
}));

const Top = (props) => {
	const classes = useStyle();
	const [date, setDate] = React.useState({start: props.search.bookDate.start, end: props.search.bookDate.end});
	const [currentLocation, setCurrentLocation] = React.useState(props.currentId);
	const filters = props.filters;
	const [filtered, handleFilter] = React.useState(props.search.filters);
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
			})
		});
		Router.push(`/viewproperty/${locid}/${id}`);
	};
	
	const handleLocation = async (id) => {
		await props.fetchProperties(id, filtered, 0);
		setSearch({id: id, filters: filtered});
	}
	
	const handleSearch = async () => {
		await props.fetchProperties(search.id, filtered, 0);
		setSearch({...search, filters: filtered});
		props.setSearchFilters(filtered);
	}
	
	const fetchNext = async () => {
		await props.fetchProperties(search.id, filtered, props.properties[search.id].index+10);
	}
	
	const results = props.properties[search.id].properties.map(item => {
		return <PropertyContainerTest
				price={item.price} 
				rating={item.ratings}
				location={item.location}
				amenities={item.amenities}
				imgSrc={item.imgSrc} 
				title={item.title}
				details={item.details}
				moredetails={item.moredetails}
				handleBook={handleBook.bind(this, props.properties[search.id]._id, item._id)}
			/>
	})
	
	return (
		<MainBody className={classes.root}>
			<Grid item md={10}>
				<FormControl fullWidth className={classes.search}>
					<Grid container direction="row">	
						<Grid item xs={12}>
							<LocationSearch 
								filters={filters}
								setFilter={setFilter}
								unsetFilter={unsetFilter}
								filtered={filtered}
								handleLocation={handleLocation}
								setSearch={handleSearch}
							/>
						</Grid>
						<Paper className={classes.dateContainer}>
							<DatePicker 
								setDate={setDate}
								date={date}
							/>
						</Paper>
					</Grid>
				</FormControl>
				<InfiniteScroll
					dataLength={props.properties[search.id].properties.length}
					next={fetchNext}
					hasMore={props.properties[search.id].hasMore}
					loader={<h4 style={{textAlign: "center"}}> Loading more items... </h4>}
					endMessage={""}
					style={{
						width: "100%",
					}}
				>
					<PreviewTest filter={search.filters} location={props.properties[search.id].location}>
							{results}
					</PreviewTest>
				</InfiniteScroll>
			</Grid>
		</MainBody>
	);
}

Top.getInitialProps = async ({store, req, isLogged}) => {
	const state = store.getState();
	let id;
	if (!state.filters.length) await store.dispatch(fetchFilters());
	if (!state.search.id) {	
		id = await fetch('https://bookmate.herokuapp.com/api/location/randomproperty').then(res => res.json()).then(res => res.id);
		console.log(store.getState());
		await store.dispatch(fetchProperties(id, [], 0));
	} else {
		id = state.search.id;
	}
	return {currentId: id};
}

const mapDispatchToProps = {
	fetchProperties,
	setSearchFilters
}

export default connect(state => ({properties: state.properties, search: state.search, filters: state.filters}), mapDispatchToProps)(Top);