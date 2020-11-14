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
import LowerDesign from '../public/SVG/Lower Design.svg';

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
		backgroundColor: '#ecf7fe',
		[theme.breakpoints.down('sm')]: {
			padding: '50px 0px 50px 0px'
		}
	},
	second: {
		minHeight: 532,
		backgroundColor: '#ffffff',
		zIndex: 2,
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			padding: '80px 0px 50px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			padding: '70px 0px 50px 0px'
		}
	},
	third: {
		minHeight: 400,
		textAlign: 'center',
		position: 'relative',
		zIndex: 1,
	},
	bgdesign: {
		position: 'absolute',
		height: '100%',
		right: 0,
		top: 0,
		zIndex: 0,
		[theme.breakpoints.down('sm')]: {
			width: '50%',
		}
	},
	firstContainer: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center'
		}
	},
	welcomeContainer: {
		zIndex: 1,
		width: 400,
		[theme.breakpoints.down('md')]: {
			width: 320,
		},
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 50,
			width: '100%',
		}
	},
	welcomeImage: {
		[theme.breakpoints.down('sm')]: {
			height: 200,
		},
		[theme.breakpoints.down('xs')]: {
			height: 150,
		}
	},
	headerContainer: {
		flex: 1,
		zIndex: 1,
		display: 'flex',
		flexDirection: 'column',
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
	secondContainer: {
		width: '70%',
		margin: '80px 0px 70px 0px',
		[theme.breakpoints.down('md')]: {
			width: '80%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '90%',
			margin: '0px 0px 60px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			alignItems: 'center',
			textAlign: 'center',
			width: '100%',
			marginBottom: 50
		}
	},
	secondTitle: {
		fontSize: '2.8rem',
		margin: '0px 0px 20px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.5rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.2rem',
			marginBottom: 15,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem'
		}
	},
	secondSubtitle: {
		fontSize: '1.3rem',
		margin: 0,
		lineHeight: '30px',
		[theme.breakpoints.down('md')]: {
			lineHeight: '28px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			lineHeight: '26px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem',
			lineHeight: '25px'
		}
	},
	perk: {
		width: '30%',
		[theme.breakpoints.down('sm')]: {
			width: '25%',
			justifyContent: 'center',
		},
		[theme.breakpoints.down('xs')]: {
			width: '80%',
			marginBottom: 15,
		}
	},
	perkImgContainer: {
		width: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginBottom: 15,
		},
		[theme.breakpoints.down('xs')]: {
			width: '90%',
		}
	},
	perkContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			flex: 'unset',
			width: '80%',
			alignItems: 'center',
			textAlign: 'center'
		}
	},
	perkImg: {
		height: 80,
		[theme.breakpoints.down('md')]: {
			height: 70,
		},
		[theme.breakpoints.down('sm')]: {
			height: 80,
		},
		[theme.breakpoints.down('xs')]: {
			height: 60
		}
	},
	perkTitle: {
		fontSize: '1.6rem',
		color: '#124f4f',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '1.4rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
		}
	},
	perkDetails: {
		fontSize: '1.2rem',
		margin: '5px 0px 0px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: 20,
			fontSize: '1rem'
		}
	},
	thirdTitle: {
		color: '#124f4f',
		fontSize: '2.5rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.2rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.9rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.6rem'
		}
	},
	thirdSubtitle: {
		marginBottom: 40,
		fontSize: '1.2rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		}
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
		zIndex: 2,
	},
	insertedRootBg: {
		position: 'absolute',
		zIndex: 0,
		height: '100%',
		width: '100%',
		backgroundColor: '#313131',
		opacity: '0.1'
	},
	insertedTitle: {
		marginTop: 20,
		zIndex: 2,
		[theme.breakpoints.down('sm')]: {
			marginTop: 15,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: 15,
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
		width: '80%',
		height: '82%',
		[theme.breakpoints.down('sm')]: {
			width: '80%',
			minHeight: '88%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			minHeight: '95%',
		}
	},
	insertedBg: {
		position: 'absolute',
		backgroundColor: '#f9f9f9',
		opacity: '0.95',
		height: '100%',
		width: '100%',
		zIndex: 0,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			height: '100%',
		}
	},
	datePickerContainer: {
		zIndex: 2,
		width: '60%',
		[theme.breakpoints.down('md')]: {
			width: '70%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '95%'
		}
	},
	filterContainer: {
		zIndex: 2,
		width: '50%',
		position: 'relative',
		[theme.breakpoints.down('md')]: {
			width: '60%',
		},
	},
	locationSearchContainer: {
		width: '60%',
		zIndex: 3,
		position: 'relative',
		[theme.breakpoints.down('md')]: {
			width: '70%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '95%'
		}
	},
	combinedContainer: {
		height: 'min-content',
		position: 'relative'
	},
	combinedDesign: {
		position: 'absolute',
		zIndex: 0,
		height: '100%',
		right: 0,
		[theme.breakpoints.down('sm')]: {
			width: '60%'
		},
		[theme.breakpoints.down('xs')]: {
			width: '70%',
			display: 'none'
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
			details: "Bookmate offers the cheapest prices on your favorite properties!",
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
		return <Grid item key={index} container alignItems="center" className={classes.perk}>
			<Grid item className={classes.perkImgContainer}>
				{item.img}
			</Grid>
			<Grid item className={classes.perkContainer}>
				<Grid item>
					<h3 className={classes.perkTitle}> {item.title} </h3>
				</Grid>
				<Grid item>
					<p className={classes.perkDetails}> {item.details} </p>
				</Grid>
			</Grid>
		</Grid>
	});
	return (
		<Grid item xs={12} style={{marginTop: -20}}>
			<Grid item xs={12} className={classes.first} container alignItems="center" justify="center">
				<BGDesign className={classes.bgdesign} />
				<Grid item xs={11} md={10} container direction="row-reverse" justify="space-between" alignItems="center" className={classes.firstContainer}>
					<Grid item className={classes.welcomeContainer}>
						<WelcomeImage className={classes.welcomeImage} viewBox="0 0 377.983 321.102"/>
					</Grid>
					<Grid item className={classes.headerContainer}>
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
			<Grid item xs={12} className={classes.second} container justify="center">
				<Grid item xs={11} md={10} container direction="column">	
					<Grid item container justify="center" alignItems="flex-start" direction="column" className={classes.secondContainer}>
						<Grid item>
							<h2 className={classes.secondTitle}> What is <span style={{color: '#124f4f'}}>Bookmate</span>? </h2>
						</Grid>
						<Grid item>
							<p className={classes.secondSubtitle}>
								Bookmate is a web-based booking application, designed to prioritize speed and convenience. Through Bookmate, you can easily find your favorite properties, and easily book a stay at just a single tap of your fingers!
							</p>
						</Grid>
					</Grid>
					<Grid item container justify="space-around">
						{mappedPerks}
					</Grid>
				</Grid>
			</Grid>
			<div className={classes.combinedContainer}>
				<LowerDesign className={classes.combinedDesign} /> 
				<Grid item className={classes.inserted} container justify="center" alignItems="center">
					<div className={classes.insertedRootBg} />
					<Grid item container direction="column" alignItems="center" className={classes.insertedContainer}>
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
							<p className={[classes.secondSubtitle, classes.thirdSubtitle].join(' ')}>
								Join the growing community of Bookmate to enjoy the hottest offers available, and easily book on your favorite properties with just a few clicks!
							</p>
						</Grid>
						<Grid item>
							<Button className={[classes.BTNsignup, classes.pillBtn].join(' ')} onClick={() => Router.push('/register')}> Register </Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
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
