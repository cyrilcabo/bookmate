//Material components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

//Import SVG images
import BGDesign from '../public/SVG/BG_design.svg';
import WelcomeImage from '../public/SVG/Welcome image.svg';
import CheapIcon from '../public/SVG/Cheap Icon.svg';
import BedIcon from '../public/SVG/Bed Icon.svg';
import SpeedIcon from '../public/SVG/Speed Icon.svg';

//Custom components
import LocationSearch from '../components/Search/locationsearch';
import Filter from '../components/Filter/filter';
import DatePicker from '../components/Search/datepicker';


//Utils
import React from 'react';
import {connect} from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Router from 'next/router';

import {fetchFilters, setSearchFilters, setSearchBookDate, setSearchId, fetchProperties} from '../redux/actions/actions';

//Styles
const useStyle = makeStyles(theme => ({
	first: {
		minHeight: 578,
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			padding: '50px 0px 50px 0px'
		}
	},
	second: {
		minHeight: 552,
		backgroundColor: '#f5ffff',
		zIndex: 2,
		position: 'relative',
		textAlign: 'center',
		boxShadow: '0px 2px 4px #313131',
		[theme.breakpoints.down('sm')]: {
			padding: '80px 0px 50px 0px'
		}
	},
	third: {
		minHeight: 370,
		textAlign: 'center',
	},
	bgdesign: {
		position: 'absolute',
		height: '100%',
		right: 0,
		top: 0,
		zIndex: -1,
		[theme.breakpoints.down('sm')]: {
			width: '50%',
		}
	},
	welcomeContainer: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 50,
		}
	},
	welcomeImage: {
		[theme.breakpoints.down('md')]: {
			height: 250,
		},
		[theme.breakpoints.down('sm')]: {
			height: 200,
		},
		[theme.breakpoints.down('xs')]: {
			height: 150,
		}
	},
	headerContainer: {
		[theme.breakpoints.down('sm')]: {
			alignItems: 'center',
			textAlign: 'center',
		}
	},
	headerTitle: {
		fontSize: '3.5rem',
		margin: '0px 0px 50px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.8rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.4rem',
			marginBottom: 20,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem',
		}
	},
	headerSubtitle: {
		fontSize: '1.5rem',
		margin: '0px 0px 70px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			marginBottom: 50,
		}
	},
	pillBtn: {
		borderRadius: '30px',
		padding: '5px 30px',
	},
	CTA: {
		fontSize: '1.5rem',
		backgroundColor: '#124f4f',
		color: 'white',
		fontWeight: 550,
		'&:hover': {
			color: '#124f4f'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem',
		}
	},
	secondTitle: {
		fontSize: '2.5rem',
		margin: '0px 0px 20px 0px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.8rem',
		}
	},
	secondSubtitle: {
		fontSize: '1.2rem',
		margin: '0px 0px 50px 0px',
		lineHeight: '30px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		}
	},
	perkImg: {
		[theme.breakpoints.down('sm')]: {
			height: 80,
		}
	},
	perkTitle: {
		fontSize: '1.5rem',
		color: '#97a900',
		margin: '15px 0px 0px 0px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.4rem',
		}
	},
	perkDetails: {
		fontSize: '1rem',
		margin: '5px 0px 0px 0px',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 20,
		}
	},
	thirdTitle: {
		color: '#124f4f',
	},
	BTNsignup: {
		fontSize: '1.3rem',
		backgroundColor: '#124f4f',
		color: 'white',
		fontWeight: 550,
		marginTop: -15,
		fontFamily: 'sans-serif',
		textTransform: 'uppercase',
		'&:hover': {
			color: '#124f4f',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem'
		}
	},
	inserted: {
		position: 'relative',
		minHeight: 415,
		zIndex: 0,
		backgroundImage: 'linear-gradient(to bottom left, #124f4f, 60%, transparent)',
	},
	insertedTitle: {
		marginTop: 55,
		zIndex: 2,
		[theme.breakpoints.down('sm')]: {
			marginTop: 48,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: 50,
		},
		'& > h2': {
			margin: 0,
			textAlign: 'center',
			fontSize: '2rem',
			color: '#313131',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.8rem',
			},
			[theme.breakpoints.down("sm")]: {
				fontSize: '1.6rem',
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.4rem',
			}
		}
	},
	insertedContainer: {
		'& > div.MuiGrid-item': {
			marginBottom: 10,
		},
		position: 'relative',
	},
	insertedBg: {
		position: 'absolute',
		width: '80%',
		height: '82%',
		backgroundColor: '#f9f9f9',
		opacity: '0.8',
		top: '9%',
		bottom: '9%',
		zIndex: 0,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			height: '88%',
			top: '6%',
			bottom: '6%'
		}
	},
	datePickerContainer: {
		width: '60%',
		[theme.breakpoints.down('md')]: {
			width: '70%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '95%'
		}
	},
	filterContainer: {
		width: '50%',
		[theme.breakpoints.down('md')]: {
			width: '60%',
		},
	},
	locationSearchContainer: {
		width: '60%',
		[theme.breakpoints.down('md')]: {
			width: '70%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '95%'
		}
	}
}));

const Index = (props) => {
	const classes = useStyle();
	//Page's states
	const [filtered, handleFilter] = React.useState(props.search.filters);
	
	const setFilter = (e) => handleFilter([...filtered, e]);
	const unsetFilter = (e) => handleFilter(filtered.filter(i => i!=e));
	
	const handleLocation = async (id) => props.setSearchId(id);
	
	const handleSearch = async () => {
		await props.fetchProperties(props.search.id, filtered, 0);
		props.setSearchId(props.search.id);
		props.setSearchFilters(filtered);
		Router.push('/top');
	}
	
	const perks = [
		{
			img: <BedIcon className={classes.perkImg} viewBox="0 0 105.273 100" />,
			title: "Comfortable",
			details: "Bookmate offers the cheapest prices on your favorite proeprties!",
		},
		{
			img: <CheapIcon className={classes.perkImg} viewBox="0 0 60.606 100" />,
			title: "Cheap",
			details: "Bookmate assures you that you get to have a relaxing staycation!",
		},
		{
			img: <SpeedIcon className={classes.perkImg} viewBox="0 0 122.273 120" />,
			title: "Fast Service",
			details: "Easily book on your favorite properties, minus all the hassle!",
		}
	];
	const mappedPerks = perks.map((item, index) => {
		return <Grid item key={index} xs={11} md={3} container direction="column" alignItems="center">
			<Grid item>
				{item.img}
			</Grid>
			<Grid item>
				<h3 className={classes.perkTitle}> {item.title} </h3>
			</Grid>
			<Grid item>
				<p className={classes.perkDetails}> {item.details} </p>
			</Grid>
		</Grid>
	});
	return (
		<Grid item xs={12} style={{marginTop: -20}}>
			<Grid item xs={12} className={classes.first} container alignItems="center" justify="center">
				<BGDesign className={classes.bgdesign} />
				<Grid item xs={11} container direction="row-reverse" justify="space-between" alignItems="center">
					<Grid item container xs={12} md={6} container justify="flex-end" alignItems="flex-end" className={classes.welcomeContainer}>
						<WelcomeImage className={classes.welcomeImage} viewBox="0 0 377.983 321.102"/>
					</Grid>
					<Grid item container xs={12} md={6} direction="column" className={classes.headerContainer} justify="center">
						<Grid item>
							<h1 className={classes.headerTitle}> Looking for a good offer on your favorites? </h1>
						</Grid>
						<Grid item>
							<p className={classes.headerSubtitle}> Bookmate is at your fingertips! </p>
						</Grid>
						<Grid item>
							<Button className={[classes.CTA, classes.pillBtn].join(' ')} onClick={() => Router.push('/top')}> Book now </Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.second} container alignItems="center" justify="center">
				<Grid item xs={12} container alignItems="center" justify="center">	
					<Grid item container xs={11} justify="center" alignItems="center" direction="column">
						<Grid item>
							<h2 className={classes.secondTitle}> What is <span style={{color: '#124f4f'}}>Bookmate</span>? </h2>
						</Grid>
						<Grid item xs={11} md={10}>
							<p className={classes.secondSubtitle}>
								Bookmate is a web-based booking application, designed to prioritize speed and convenience. Through Bookmate, you can easily find your favorite properties, and easily book a stay at just a single tap of your fingers!
							</p>
						</Grid>
					</Grid>
					<Grid item md={10} container justify="space-around">
						{mappedPerks}
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.inserted} container justify={"center"}>
				<Grid item container xs={11} md={10} direction="column" alignItems="center" className={classes.insertedContainer}>
					<div className={classes.insertedBg} />
					<Grid item className={classes.insertedTitle}>
						<h2> Find your favorite property! </h2>
					</Grid>
					<Grid item className={classes.datePickerContainer}>
						<DatePicker 
							isDefault
							date={props.search.bookDate} 
							setDate={props.setSearchBookDate} 
							width={{xs: 12, md: 5}}
						/>
					</Grid>
					<Grid item className={classes.locationSearchContainer}>
						<LocationSearch
							filters={props.filters}
							setFilter={setFilter}
							unsetFilter={unsetFilter}
							filtered={filtered}
							handleLocation={handleLocation}
							setSearch={handleSearch}
						/>
					</Grid>
					<Grid item className={classes.filterContainer}>
						<Hidden smDown>
							<Filter
								filters={props.filters}
								setFilter={setFilter}
								unsetFilter={unsetFilter}
								filtered={filtered}
								handleLocation={handleLocation}
								setSearch={handleSearch}
								style={{
									color: '#313131'
								}}
							/>
						</Hidden>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.third} container alignItems="center" justify="center">
				<Grid item xs={11} sm={10} md={8} container direction="column" alignItems="center">
					<Grid item>
						<h2 className={[classes.secondTitle, classes.thirdTitle].join(' ')}> Be part of Bookmate </h2>
					</Grid>
					<Grid item>
						<p className={classes.secondSubtitle}>
							Join the growing community of Bookmate to enjoy the hottest offers available, and easily book on your favorite properties with just a few clicks!
						</p>
					</Grid>
					<Grid item>
						<Button className={[classes.BTNsignup, classes.pillBtn].join(' ')} onClick={() => Router.push('/register')}> Register </Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

Index.getInitialProps = async ({store, req}) => {
	const state = store.getState();
	if (!state.filters.length) await store.dispatch(fetchFilters());
}

const mapDispatchToProps ={
	setSearchFilters,
	setSearchId,
	setSearchBookDate,
	fetchProperties
}

export default connect(state => ({filters: state.filters, search: state.search}), mapDispatchToProps)(Index);
