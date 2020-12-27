//Custom components
import LocationSearch from '../components/Search/locationsearch';
import DatePicker from '../components/Search/datepicker';
import PreviewTest from '../components/Preview/previewtest';
import PropertyContainerTest from '../components/PropertyContainer/propertycontainertest';
import FilterSettings from '../components/Filter/filtersettings';
import Filter from '../components/Filter/filter';

//Material components
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';

//Utils
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import {connect} from 'react-redux';
import Router from 'next/router';

//Redux actions
import {
	fetchProperties, 
	setSearchFilters,
	setSearchBookDate, 
	searchRandomProperty, 
	fetchFilters,
	setSearchId
} from '../redux/actions/actions';

//API calls
import {apiSetDate} from '../utils/api';

const useStyle = makeStyles(theme => ({
	header: {
		height: 150,
		color: '#f4f5f5',
		backgroundColor: 'black',
		borderRadius: 10,
		'& > div.MuiGrid-item': {
			marginLeft: 10,
			[theme.breakpoints.down('xs')]: {
				marginLeft: 3,
			}
		},
		[theme.breakpoints.down('sm')]: {
			borderRadius: 0,
		}
	},
	headerDesign: {
		width: 30,
		'&#hD1': {
			height: 30,
			backgroundColor: '#c5fefe',
		},
		'&#hD2': {
			height: 50,
			backgroundColor: '#f3f351',
		},
		'&#hD3': {
			height: 70,
			backgroundColor: '#0a4f4f',
		},
		[theme.breakpoints.down('xs')]: {
			width: 15,
			'&#hD1': {
				height: 10,
			},
			'&#hD2': {
				height: 20,
			},
			'&#hD3': {
				height: 30,
			},
		}
	},
	headerTitle: {
		fontSize: '3.5rem',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '3rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	searchOptions: {
		position: 'sticky',
		top: 0,
		alignSelf: 'flex-start',
		justifyContent: 'flex-end',
		[theme.breakpoints.down('sm')]: {
			position: 'relative',
			justifyContent: 'center',
			marginBottom: 15,
		},
		'& > div.MuiPaper-root': {
			padding: 5, 
			backgroundColor: 'black', 
			width: '90%',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			}
		}
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
	const {filters, search, properties} = props;
	const [filtered, handleFilter] = React.useState(props.search.filters);

	const setFilter = (e) => handleFilter([...filtered, e]);
	const unsetFilter = (e) => handleFilter(filtered.filter(i => i!=e));
	const handleBook = async (locid, id) => {
		await apiSetDate(search.bookDate.start, search.bookDate.end);
		Router.push(`/property?locid=${locid}&propertyid=${id}`);
	};
	
	const handleLocation = async (id) => {
		await props.fetchProperties(id, filtered, 0);
		props.setSearchId(id);
		props.setSearchFilters(filtered);
	}
	
	const handleSearch = async () => {
		await props.fetchProperties(search.id, filtered, 0);
		props.setSearchFilters(filtered);
	}
	
	const fetchNext = async () => await props.fetchProperties(search.id, search.filters, properties[search.id].index+10);
	
	const results = properties[search.id].properties.map((item, index) => {
		return <PropertyContainerTest
			price={item.price} 
			rating={item.ratings}
			location={item.location}
			amenities={item.amenities}
			imgSrc={item.imgSrc} 
			title={item.title}
			details={item.details}
			moredetails={item.moredetails}
			handleBook={handleBook.bind(this, properties[search.id]._id, item._id)}
			key={index}
		/>
	})
	
	return (
		<Grid item xs={12} container justify="center" style={{marginTop: 50}}>
			<Grid item xs={12} md={11} container direction="column" alignItems="center" spacing={2}>
				<Grid item className={classes.header} container justify="center" alignItems="center">
					<Grid item className={classes.headerDesign} id={"hD1"} />	
					<Grid item className={classes.headerDesign} id={"hD2"} />	
					<Grid item className={classes.headerDesign} id={"hD3"} />						
					<Grid item>
						<p className={classes.headerTitle}> Search top properties </p>
					</Grid>
				</Grid>
				<Grid item container>
					<LocationSearch
						filters={filters}
						setFilter={setFilter}
						unsetFilter={unsetFilter}
						filtered={filtered}
						handleLocation={handleLocation}
						setSearch={handleSearch}
					/>
				</Grid>
				<Grid item container direction="row-reverse" justify="space-around">
					<Grid item container xs={12} md={3} className={classes.searchOptions}>
						<Paper>
							<DatePicker 
								setDate={props.setSearchBookDate}
								date={search.bookDate}
								width={{xs:12}}
							/>
							<Hidden smDown>
								<Filter
									filters={filters}
									setFilter={setFilter}
									unsetFilter={unsetFilter}
									filtered={filtered}
									handleLocation={handleLocation}
									setSearch={handleSearch}
									style={{
										color: '#f4f5f5'
									}}
								/>
							</Hidden>
						</Paper>
					</Grid>
					<Grid item xs={12} md={9} style={{boxShadow: '0px 0px 2px black', backgroundColor: 'white', borderRadius: 2}}>
						<InfiniteScroll
							dataLength={properties[search.id].properties.length}
							next={fetchNext}
							hasMore={properties[search.id].hasMore}
							loader={<h4 style={{textAlign: "center"}}> Loading more items... </h4>}
							endMessage={""}
							style={{
								width: "100%",
							}}
						>
							<PreviewTest 
								filter={search.filters} 
								location={properties[search.id].location}
							>
									{results}
							</PreviewTest>
						</InfiniteScroll>
					</Grid>
				</Grid>
			</Grid>
			<style jsx global>{`
				body {
					background-color: #f6ffff !important;
				}
			`}</style>
		</Grid>
	);
}

Top.getInitialProps = async ({store, req, isLogged}) => {
	const state = store.getState();
	if (!state.filters.length) await store.dispatch(fetchFilters());
	if (!state.search.id) {	
		await store.dispatch(searchRandomProperty());
		await store.dispatch(fetchProperties(store.getState().search.id, [], 0));
	}
}

const mapDispatchToProps = {
	fetchProperties,
	setSearchFilters,
	setSearchId,
	setSearchBookDate
}

export default connect(state => ({properties: state.properties, search: state.search, filters: state.filters}), mapDispatchToProps)(Top);
