//Material components
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Utils
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Router from 'next/router';

//Material icons
import CheckIcon from '@material-ui/icons/Check';

const useStyle = makeStyles(theme => ({
	root: {
		marginBottom: 6,
		minHeight: 500,
		[theme.breakpoints.down("sm")]: {
			paddingLeft: 1,
			paddingRight: 0,
			marginLeft: 0,
			marginRight: 0,
		}
	},
	fullWidth: {
		[theme.breakpoints.down("xs")]: {
			paddingLeft: 1,
			paddingRight: 0,
		}
	},
	filter: {
		marginBottom: 5,
		paddingTop: 5,
	},
	emptyMessage: {
		width: '100%',
		alignSelf: 'center',
		color: "#f50057",
		textAlign: "center",
		'& > h6': {
			fontSize: '1.8rem',
			marginBottom: 20,
			[theme.breakpoints.down('md')]: {
				fontSize: '1.5rem',
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.2rem',
			}
		}
	},
	bookingButton: {
		backgroundColor: '#0a4f4f',
		color: '#f4f5f5',
		fontSize: '1.3rem',
		padding: '5px 40px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			padding: '5px 30px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem',
			padding: '5px 20px',
		}
	}
}));

const PreviewTest = (props) => {
	const classes = useStyle();
	const {filter, location, purpose} = props;
	const emptyMsg = () => {
		switch (purpose) {
			case 'booking':
				return (
					<React.Fragment>
						<h6> You haven't made any bookings yet! </h6>
						<Button 
							className={classes.bookingButton}
							onClick={() => Router.push('/top')}
							variant="contained"
						> Book now </Button>
					</React.Fragment>
				);
			case 'property':
			default:
				return <h6> Sorry, no properties are available... </h6>
		}
	}	
	const propertyItems = props.children.map((item, index) => {
		return (
			<ListItem className={classes.fullWidth} key={index}>
				{item}
			</ListItem>
		); 
	});
	const filters = (filter) ?filter.map((item, index) => {
		return (
			<Grid item xs={6} md={3} container key={index} justify="space-between" alignItems="center">
				<div style={{display: "flex", justifyContent: "center", alignItems: 'center'}}> <CheckIcon style={{fill: '#0a4f4f'}} /> {item} </div>
			</Grid>
		);
	}) :"";
	return (
		<div className={[classes.root, props.className].join(" ")} {...props}>
			{(location || filter)
				? <div>
					<Grid container justify="center" className={classes.filter} direction="row">
						<Grid item xs={12} sm={2} container justify="center" alignItems="center">
							<Typography style={{textAlign: "center", color: '#0a4f4f'}}> Showing results for: </Typography>
						</Grid>
						<Grid item container xs={12} sm={10} justify="flex-start" alignItems="center" direction="row">
							{(location)
								? <Grid item xs={6} md={3} container alignItems="center"> <CheckIcon style={{fill: '#0a4f4f'}} />{location} </Grid>
								: ""}
							{filters}
						</Grid>
					</Grid>
					<Divider />
				  </div>
				: ""
			}
			{(props.children.length)
				?<List>
					{propertyItems}
				</List>
				:<div className={classes.emptyMessage}> {emptyMsg()} </div>
			}	
		</div>
	);
}

export default PreviewTest;