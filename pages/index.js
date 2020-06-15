//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

//Custom svg images
import {
	BookmateIcon, 
	WelcomeBg,
	WelcomeImg,
	CheapIcon,
	BedIcon,
	SpeedIcon,
	LeftBorderDesign,
	RightBorderDesign,
	BlackCheckIn
} from '../public/svg-icons';

//Utils
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

const useStyle = makeStyles(theme => ({
	noMargin: {
		margin: 0,
	},
	banner: {
		height: 470,
		position: 'relative',
		[theme.breakpoints.down('xs')]: {
			marginTop: 50,
		},
		[theme.breakpoints.down('xs')]: {
			height: 300,
		}
	},
	bannerLogo: {
		height: '95%',
		width: '85%',
		[theme.breakpoints.down('xs')]: {
			height: '60%',
			width: '100%'
		}
	},
	bannerDesign: {
		backgroundColor: '#f4f1a7',
		borderRadius: '100%',
		position: 'absolute',
		zIndex: -1
	},
	smallCircle: {
		height: '30%',
		width: 140,
	},
	bigCircle: {
		height: '50%',
		width: 220,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		}
	},
	welcome: {
		minHeight: 500,
		position: 'relative',
	},
	welcomeTitle: {
		fontSize: '4rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem'
		}
	},
	welcomeDetails: {
		fontSize: '1.8rem',
	},
	welcomeContent: {
		[theme.breakpoints.down('sm')]: {
			margin: '70px 0px 70px 0px',
		},
		[theme.breakpoints.down('sm')]: {
			margin: '100px 0px 50px 0px',
		}
	},
	welcomeBg: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: -1,
	},
	welcomeImg: {
		height: 350,
		[theme.breakpoints.down('sm')]: {
			width: 250,
			height: 200,
		}
	},
	amenities: {
		minHeight: 450,
		textAlign: 'center',
		margin: '50px 0px 50px 0px',
	},
	amenitiesTitle: {
		fontSize: '2.5rem',
		margin: 10,
	},
	amenitiesDetails: {
		fontSize: '1.8rem',
		margin: 0,
	},
	catcher: {
		minHeight: 600,
		textAlign: 'center',
		position: 'relative',
		backgroundColor: '#f4f1a7',
	},
	borderDesign: {
		position: 'absolute',
		height: 200,
		width: 200,
		zIndex: 0,
	},
	leftBorderDesign: {
		left: '5%',
		top: '5%',
		[theme.breakpoints.down('xs')]: {
			left: 0,
			top: 0
		}
	},
	rightBorderDesign: {
		right: '5%',
		bottom: '5%',
		[theme.breakpoints.down('xs')]: {
			right: 0,
			bottom: 0
		}
	},
	catcherContent: {
		[theme.breakpoints.down('sm')]: {
			margin: '70px 0px 70px 0px'
		}
	},
	catcherDetails: {
		fontSize: '2.5rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem'
		}
	}
}));

const Index = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12}>
			<Grid item xs={12} className={classes.banner} container justify="center">
				<div style={{top: 10, left: 10}} className={[classes.bannerDesign, classes.smallCircle].join(' ')} />
				<div style={{bottom: 10, right: 10}} className={[classes.bannerDesign, classes.smallCircle].join(' ')} />
				<div style={{bottom: 10, left: '10%'}} className={[classes.bannerDesign, classes.bigCircle].join(' ')} />
				<div style={{top: 10, right: '10%'}} className={[classes.bannerDesign, classes.bigCircle].join(' ')} />
				<Grid xs={10} item style={{position: 'relative', height: '100%'}} container justify="center" alignItems="center">
					<BookmateIcon className={classes.bannerLogo}/>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.welcome} container justify="center">
				<div className={classes.welcomeBg}> <WelcomeBg width="100%" height="100%" /> </div>
				<Grid item xs={11} md={10} container justify="center" alignItems="center" className={classes.welcomeContent}>
					<Grid item xs={12} md={5} container justify="center" alignItems="center">
						<WelcomeImg width="100%" className={classes.welcomeImg} />
					</Grid>
					<Grid 
						item 
						xs={12} 
						md={7}
						spacing={2} 
						container 
						justify="center" 
						direction="column" 
						alignItems="center" 
						style={{color: '#f6f6f6', textAlign: 'center'}}
					>
						<Grid item>
							<h2 className={[classes.welcomeTitle, classes.noMargin].join(' ')}> Welcome to Bookmate </h2>
						</Grid>
						<Grid item>
							<p className={[classes.welcomeDetails, classes.noMargin].join(' ')}>
								Bookmate is a web-based booking application, designed to prioritize speed and convenience.
								Through Bookmate, you can easily find your favorite properties, and easily book a stay at just 
								a single tap of your fingers! 
							</p>
						</Grid>
						<Grid item>
							<Button 
								variant="contained"
								style={{
									fontSize: '1.5rem', 
									backgroundColor: '#64e6e6',
								}}
								onClick={() => Router.push('/top')}
							> Book Now </Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} container justify="center" alignItems="center" className={classes.amenities}>
				<Grid item xs={12} container justify="space-around" alignItems="center">
					<Grid item xs={12} md={3} container direction="column" alignItems="center">
						<Grid item>
							<CheapIcon height={200} width={200} />
						</Grid>
						<Grid item>
							<h2 className={classes.amenitiesTitle}> Cheap </h2>
						</Grid>
						<Grid item>
							<p className={classes.amenitiesDetails}> Bookmate offers the cheapest prices on your favorite properties! </p>
						</Grid>
					</Grid>
					<Grid item xs={12} md={3} container direction="column" alignItems="center">
						<Grid item>
							<BedIcon height={200} width={200} />
						</Grid>
						<Grid item>
							<h2 className={classes.amenitiesTitle}> Comfortable </h2>
						</Grid>
						<Grid item>
							<p className={classes.amenitiesDetails}> Bookmate assures you that you get to have a relaxing staycation! </p>
						</Grid>
					</Grid>
					<Grid item xs={12} md={3} container direction="column" alignItems="center">
						<Grid item>
							<SpeedIcon height={200} width={200} />
						</Grid>
						<Grid item>
							<h2 className={classes.amenitiesTitle}> Fast Service </h2>
						</Grid>
						<Grid item>
							<p className={classes.amenitiesDetails}> Easily book on your favorite properties, minus all the hassle! </p>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} justify={"center"} alignItems={"center"} container className={classes.catcher}>
				<LeftBorderDesign className={[classes.borderDesign, classes.leftBorderDesign].join(' ')} />
				<RightBorderDesign className={[classes.borderDesign, classes.rightBorderDesign].join(' ')} />
				<Grid className={classes.catcherContent} item xs={10} md={8} direction="column" container>
					<Grid item container justify="center">
						<h2 style={{margin: "20px 0px 30px 0px"}} className={classes.welcomeTitle}> Be part of Bookmate </h2>
					</Grid>
					<Grid item container direction="row-reverse" spacing={5}>
						<Grid item xs={12} md={4} container justify="center" alignItems="center">
							<BlackCheckIn height={300} width={300} />
						</Grid>
						<Grid item xs={12} md={8} spacing={2} container direction="column" alignItems="center">
							<Grid item>
								<p className={[classes.catcherDetails, classes.noMargin].join(' ')}>
									Join the growing community of Bookmate to enjoy the hottest offers available,
									and easily book on your favorite properties with just a few clicks!
								</p>
							</Grid>
							<Grid item>
								<Button 
									variant="contained" 
									style={{backgroundColor: props.isLogged ?'gray' :'#0a4f4f', fontSize: '2rem', color: 'white'}}
									onClick={() => Router.push('/register')}
									disabled={props.isLogged}
								>
									Sign up
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Index;