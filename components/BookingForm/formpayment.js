import {Grid, Paper, Divider, Typography, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core/';
import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';

const useStyle = makeStyles({
	priceTag: {
		display: "flex",
		padding: 5,
		margin: 5,
		backgroundColor: "black",
		color: "white",
		width: "100%",
		marginBottom: 3,
	},
	price: {
		fontSize: "2rem",
	}
})

const FormPayment = (props) => {
	const classes = useStyle();
	const handleSelect = (e) => {
		props.setPaymentMode(e.target.value);
	}
	return (
		<Grid item container xs={12} justify="center">
			<Paper className={classes.priceTag}>
				<Grid item xs={12} container justify="flex-start">
					Total payment to be made:
				</Grid>
				<Divider />
				<Grid item xs={12} container justify="flex-end">
					<Typography color="secondary" className={classes.price}> P{props.price} </Typography>
				</Grid>
			</Paper>
			<Divider />
			<FormControl fullWidth>
				<InputLabel> Choose payment method </InputLabel>
				<Select value={props.paymentMode} onChange={handleSelect} placeholder="Choose payment method: ">
					<MenuItem value="Card"> Card </MenuItem>
					<MenuItem value="Pay at property"> Pay at property </MenuItem>
				</Select>
			</FormControl>
		</Grid>
	);
}

export default FormPayment;