import React from 'react';
import {Card, Grid, CardMedia, CardContent, Typography, Button} from '@material-ui/core/';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {StarIcon} from '../../public/svg-icons';

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
		minHeight: 200,
		display: "flex",
		flexDirection: "column",
		padding: 5,
		[theme.breakpoints.up('md')]: {
			padding: 10,
			paddingBottom: 20,
		}
	},
	pullDown: {
		marginTop: "auto",
	},
	span: {
		backgroundColor: "#f8f5a7",
		margin: 3,
		marginLeft: 0,
		padding: 3,
		borderRadius: 1,
	},
	discount: {
		color: "red",
		fontSize: "1.2rem",
	},
	slashedPrice: {
		color: "gray",
		textDecoration: "line-through",
	},
	price: {
		color: "#236a0d",
		fontSize: "1.5rem",
	},
}));

const PropertyContainerTest = (props) => {
	const expandable = React.useState(false);
	const classes = useStyle();
	const amenities = (props.amenities)
		?props.amenities.map((item, index) => <span className={classes.span} key={index}> {item} </span>)
		:"";
	const button = () => {
		switch (props.type) {
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
			case "BOOK":
			default: return {
				color: "primary",
				style: {
					backgroundColor: '#0a4f4f'
				},
				text: "BOOK",
			}
		}
	}
	const status = () => {
		switch (props.status) {
			case "Unpaid":
				return {
					text: "Unpaid",
					style: {
						backgroundColor: 'maroon',
					}
				}
			case "Done":
				return {
					text: "Done",
					style: {
						backgroundColor: 'gray',
					}
				}
			case "Paid":
			default: 
				return {
					text: "Paid",
					style: {
						backgroundColor: '#1c6506'
					}
				}
		}
	}
	return (
		<React.Fragment>
			<Card className={classes.card} elevation={4}>
				<Grid item xs={12} container justify="center" style={{height: '100%'}}>
					<Grid item xs={12} sm={4}>
						<img src={props.imgSrc} className={classes.display} />
					</Grid>
					<Grid item xs={12} sm={8} className={classes.inner}>
						<Grid container item direction="row" xs={12}>
							<Grid item xs={8}>
								<h5 style={{fontSize: '1.5rem', color: '#0a4f4f', margin: 0}}>
									{props.title}
								</h5>
								<div>
									<h3 style={{margin: 0}}>	
										{props.location ?props.location :""}
									</h3>
									{props.details ?<p style={{margin: 0, fontSize: '1.1rem'}}> <i> {props.details} </i> </p> :""}
									<Typography>
										{amenities}
									</Typography>
									{props.size
										?<p style={{margin: "5px 0px 5px 0px"}}>
											<span style={{ backgroundColor: 'black', color: 'white', padding: 4, fontSize: '0.9rem'}}>
												Room size: {props.size}
											</span>
										</p>
										:""
									}
								</div>
							</Grid>
							<Grid item container alignItems="flex-end" direction="column" xs={4}>
								{props.rating	
									?<Grid item container alignItems="center" justify="flex-end" style={{color: '#fdc806'}}>
										<p style={{margin: 0, fontSize: '1.2rem'}}> {props.rating} </p> 
										<StarIcon height={20} />  
									</Grid>
									:""
								}
								{props.price.discount	
									?<React.Fragment>
										<Typography>
											<span className={classes.slashedPrice}> P{props.price.oPrice} </span>
										</Typography>
										<Typography>
											<span className={classes.discount}> {`${props.price.discount*100}%`} off! </span>
										</Typography>
									</React.Fragment>
									:""
								}
								<Typography>
									<span className={classes.price}> P{props.price.price} </span>
								</Typography>
								{props.pax	
									?<p style ={{margin: 0, padding: 3, borderRadius: 1, backgroundColor: '#dbf3f3', }}> 
										{props.pax} person{props.pax > 1 && 's'} 
									</p>
									:""
								}
								{props.moredetails ?props.moredetails :""}
								{props.status	
									?<p sytle={{margin: 0}}>
										<span style={{color: "white", padding: 2, margin: '2px 0px 2px 0px', borderRadius: 1, ...status().style}}>
											{status().text}
										</span>
									</p>
									:""
								}
							</Grid>
						</Grid>
						<Grid item className={classes.pullDown}>
							<Button 
								fullWidth 
								variant="contained" 
								onClick={props.handleBook} 
								color={button().color} 
								disabled={props.disabled}
								style={button().style, {backgroundColor: props.disabled && 'gray', cursor: props.disabled && 'not-allowed'}}
							> 
								{button().text}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</React.Fragment>
	);
}

export default PropertyContainerTest;