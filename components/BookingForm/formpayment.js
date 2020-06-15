import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import StripePayment from '../../components/StripePayment/stripepayment';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';

import {apiFetchBilling} from '../../utils/api';

const stripePromise = loadStripe('pk_test_51Gu9vhF6J0iQvxK8eUOKOP5xOUwLtvzhD0C0LsPWypLCWP8TJ0P4eVYtKXHTjsTTrfHlryeRR8V6ElqubRX7nblq00SaKI5JfP');

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
	const [paymentSuccess, setPaymentSuccess] = React.useState(false);

	const handleSelect = async (e) => {
		props.setPaymentMode(e.target.value);
		if (e.target.value==="Card") {
			props.setDisabled(true);
			await apiFetchBilling().then(res => res.json()).then((res) => {
				if (res.status==="ok") {
					props.setPaymentSecret(res.secret);
				}
			});
		}
	}


	const confirmBooking = () => props.confirmBooking(props.details, props.paymentMode);

	return (
		<Grid item container xs={12} justify="center">
			{paymentSuccess
				?<Grid item style={{textAlign: 'center', color: '#1c6506'}} container direction="column" alignItems="center">
					<h3 style={{fontSize: '1.5rem', margin: 0}}>
						You have successfully paid your booking!
					</h3>
					<p style={{fontSize: '1rem', margin: 0}}>
						Confirming...
					</p>
				</Grid>
				:<React.Fragment>
					<Paper className={classes.priceTag}>
						<Grid item xs={12} container justify="flex-start" alignItems="center" style={{fontSize: '1.2rem'}}>
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
							<MenuItem value="Pay at property"> Pay at property </MenuItem>
							<MenuItem value="Card"> Card </MenuItem>
						</Select>
					</FormControl>
					{props.paymentMode==="Card"
						?<Elements stripe={stripePromise}>
							<StripePayment 
								setDisabled={props.setDisabled} 
								setPaymentSuccess={setPaymentSuccess} 
								paymentSecret={props.paymentSecret}
								details={props.details}
								confirmBooking={confirmBooking} 
							/>
						</Elements>
						:""
					}
				</React.Fragment>
			}
		</Grid>
	);
}

export default FormPayment;