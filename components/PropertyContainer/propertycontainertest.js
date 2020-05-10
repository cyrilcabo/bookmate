import React from 'react';
import {Card, Grid, CardMedia, CardContent, Typography, Button} from '@material-ui/core/';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	display: {
		height: "100%",
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			maxHeight: 200,
		}
		
	},
	card: {
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			marginRight: 3,
			marginLeft: 0,
		},
	},
	inner: {
		height: "100%",
		width: "100%",
		minHeight: 200,
		display: "flex",
		flexDirection: "column",
	},
	pullDown: {
		marginTop: "auto",
	},
	span: {
		backgroundColor: "gray",
		margin: 2,
		padding: 3,
		borderRadius: 1,
	},
	discount: {
		color: "red",
		size: "1.2 rem",
	},
	slashedPrice: {
		color: "gray",
		textDecoration: "line-through",
	},
	price: {
		color: "green",
		size: "1.5 rem",
	},
}));

const PropertyContainerTest = (props) => {
	const expandable = React.useState(false);
	const classes = useStyle();
	const amenities = (props.amenities)
		?props.amenities.map(item => <span className={classes.span}> {item} </span>)
		:"";
	const price = (props.price) 
		?(props.price.discount) 
			?<React.Fragment>
				<Typography>
					<span className={classes.discount}> {props.price.discount} off! </span>
					<span className={classes.slashedPrice}> P{props.price.price} </span>
				</Typography>
				<Typography>
					<span className={classes.price}> P{props.price.dPrice} </span>
				</Typography>
			</React.Fragment>
			: <Typography> <span className={classes.price}> P{props.price.price} </span> </Typography>
		:"";
	const button = () => {
		switch (props.type) {
			case "BOOK":
				return {
					color: "secondary",
					text: "BOOK",
				};
			case "CONFIRM":
				return {
					color: "secondary",
					text: "CONFIRM",
				};
			case "VIEW":
				return {
					color: "primary",
					text: "VIEW BOOKING",
				};
			default: return {
				color: "secondary",
				text: "BOOK",
			}
		}
	}
	return (
		<React.Fragment>
			<Card className={classes.card} elevation={4}>
				<Grid item xs={12} container justify="center">
					<Grid item xs={12} sm={4}>
						<img src={props.imgSrc} className={classes.display} />
					</Grid>
					<Grid item xs={12} sm={8}>
						<CardContent className={classes.inner}>
							<Grid container item direction="row" className={classes.content}>
								<Grid item xs={8}>
									<Typography>
										{props.title}
									</Typography>
									<div>
										<Typography>	
											{props.location ?props.location :""}
										</Typography>
										{props.details ?props.details.map(item => <Typography> {item} </Typography>) :""}
										<Typography>
											{amenities}
										</Typography>
									</div>
								</Grid>
								<Grid item container alignItems="flex-end" direction="column" xs={4}>
									{props.rating	
										?<Typography style={{color: 'gold'}}>
											{props.rating}
										</Typography>
										:""
									}
									{price}
									{props.moredetails ?props.moredetails :""}
								</Grid>
							</Grid>
							<Grid item className={classes.pullDown}>
								<Button fullWidth variant="outlined" onClick={props.handleBook} color={button().color} disabled={props.disabled}> 
									{button().text}
								</Button>
							</Grid>
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		</React.Fragment>
	);
}

export default PropertyContainerTest;