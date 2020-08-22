import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import FavoriteIcon from '@material-ui/icons/Favorite';
import CallIcon from '@material-ui/icons/Call';

import {StarIcon} from '../../public/svg-icons';

import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		padding: 10,
		flexDirection: 'column',
		minHeight: 100,
	},
	title: {
		fontSize: '2rem',
		color: '#0a4f4f',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	location: {
		fontSize: '1.3rem',
		color: '#4e4e4e',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.2rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem',
		}
	},
	details: {
		fontSize: '1rem',
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.95rem',
		}
	},
	rating: {
		margin: 0, 
		color: '#fdc806', 
		fontSize: '1.4rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.25rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.05rem',
		}
	},
	icon: {
		height: 25,
		width: 25,
		[theme.breakpoints.down('md')]: {
			height: 20,
			width: 20,
		},
		[theme.breakpoints.down('xs')]: {
			height: 18,
			width: 18,
		}
	}
}));

const PropertyTitle = (props) => {
	const classes = useStyle();
	const [isFavorite, setFavorite] = React.useState(false);

	const handleFavorite = () => setFavorite(isFavorite ?false :true);

	return (
		<Paper className={classes.root} elevation={3} >
			<Grid item style={{display: 'flex', alignItems: "center"}}>
				<Grid item container>
					<h3 style={{margin: 0}} className={classes.title}> {props.title} </h3>
				</Grid>
				<Grid item container alignItems="center" justify="flex-end">
					<Grid item>
						<IconButton onClick={handleFavorite}>
							<FavoriteIcon style={{fill: isFavorite ?"red" :""}} />
						</IconButton>
					</Grid>
					<Grid item>
						<Hidden mdUp>
							<IconButton onClick={() => window.location.href="#contacts"}>
								<CallIcon />
							</IconButton>
						</Hidden>
					</Grid>
				</Grid>
			</Grid>
			<Grid item style={{marginBottom: 5}}>
				<Divider style={{width: '100%' }}/>
			</Grid>
			<Grid item container>
				<Grid item style={{display: 'flex', flexDirection: 'column', flex: 1}}>
					<Grid item>
						<h3 style={{margin: 0}} className={classes.location}> {props.location} </h3>
					</Grid>
					<Grid item>
						<h4 style={{margin: 0}}> {props.address} </h4>
					</Grid>
					<Grid item style={{marginTop: 10}}>
						<p style={{margin: 0}} className={classes.details}> {props.details} </p>
					</Grid>
				</Grid>
				<Grid item style={{display: 'flex', flexDirection: 'column'}}>
					<Grid item container alignItems="center">
						<Grid item>
							<p className={classes.rating}> {props.rating} </p>
						</Grid>
						<Grid item>
							<StarIcon className={classes.icon} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default PropertyTitle;
