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


//Utils
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Router from 'next/router';

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
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			padding: '80px 0px 50px 0px'
		}
	},
	third: {
		minHeight: 401,
		textAlign: 'center'
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
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
			marginBottom: 30,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem',
		}
	},
	headerSubtitle: {
		fontSize: '1.5rem',
		margin: '0px 0px 70px 0px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			marginBottom: 50,
		}
	},
	pillBtn: {
		fontFamily: 'serif',
		borderRadius: '30px',
		padding: '5px 30px',
		textTransform: 'none',
	},
	CTA: {
		fontSize: '1.8rem',
		backgroundColor: '#124f4f',
		color: 'white',
		fontWeight: 550,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.4rem',
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
		margin: '15px 0px 0px 0px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.4rem',
		}
	},
	perkDetails: {
		fontSize: '1rem',
		margin: '15px 0px 0px 0px',
		[theme.breakpoints.down('sm')]: {
			marginBottom: 20,
		}
	},
	BTNsignup: {
		fontSize: '1.3rem',
		backgroundColor: '#f1ea50',
		color: 'black',
		marginTop: -15,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem'
		}
	}
}));

const Index = () => {
	const classes = useStyle();
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
			<Grid item xs={12} className={classes.third} container alignItems="center" justify="center">
				<Grid item xs={11} sm={10} md={8} container direction="column" alignItems="center">
					<Grid item>
						<h2 className={classes.secondTitle}> Be part of Bookmate </h2>
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

export default Index;