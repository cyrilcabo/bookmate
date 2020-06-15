//Custom components
import PreviewTest from '../components/Preview/previewtest';
import PageTemplate from '../components/PageTemplate/pagetemplate';
import PropertyContainerTest from '../components/PropertyContainer/propertycontainertest';

//Material components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';

//Utils
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import {connect} from 'react-redux';

//Custom svg icons
import {HotBannerImage} from '../public/svg-icons';

//Redux actions
import {fetchHot} from '../redux/actions/actions';

import {apiSetDate} from '../utils/api';

const useStyle = makeStyles(theme => ({
	header: {
		minHeight: 350,
		backgroundColor: '#effefe',
		textAlign: 'center',
		[theme.breakpoints.down('xs')]: {
			marginTop: 20,
			padding: 10,
		}
	},
	headerImage: {
		[theme.breakpoints.down('sm')]: {
			width: 500,
		},
		[theme.breakpoints.down('xs')]: {
			height: 150,
			width: '100%'
		}
	},
	headerTitle: {
		margin: 0,
		color: '#0a4f4f',
		fontSize: '4rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '3rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem'
		}
	},
	headerDetails: {
		margin: 0,
		fontSize: '1.8rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.5rem',
		}
	},
	root: {
		display: "flex",
		justifyContent: "center",
	},
}));

const Hot = (props) => {
	const classes = useStyle();
	const {start, end} = props.search.bookDate;
	const handleBook = async (locid, id) => {
		await apiSetDate(start, end);
		Router.push(`/property?locid=${locid}&propertyid=${id}`);
	};
	
	const hotOffers = props.hot.map((hot, index) => {
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
					key={index}
				/>
	});
	
	return (
		<Grid item container xs={12} justify={"center"}>
			<Grid item xs={12} className={classes.header} container justify="center">
				<Grid item xs={12} sm={10} container alignItems="center">
					<Grid item xs={12} md={6}>
						<HotBannerImage className={classes.headerImage} />
					</Grid>
					<Grid item xs={12} md={6} direction="column" container justify="flex-start" alignItems="center" spacing={2} style={{padding: 5}}>
						<Grid item>
							<h4 className={classes.headerTitle}> Exciting Offers </h4>
						</Grid> 
						<Grid item >
							<p className={classes.headerDetails}>
								Hot offers are those properties with the cheapest and reasonable prices that are randomly picked,
								so you don't have to go through all the trouble of searching for budget-wise options!
							</p>
						</Grid>
						<Grid item container justify="center">
							<Divider style={{width: '90%', height: 10, backgroundColor: '#e8fd2e'}} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} container justify="center">
				<PageTemplate title={'HOT'}>
					<PreviewTest style={{width: '100%'}}>
						{hotOffers}
					</PreviewTest>
				</PageTemplate>
			</Grid>
		</Grid>
	);
}

Hot.getInitialProps = async ({store, req}) => {
	if (req || !store.getState().hot.length) {
		await store.dispatch(fetchHot(10));
	}
}

export default connect(state => ({hot: state.hot, search: state.search}))(Hot);