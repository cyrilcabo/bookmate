import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

import {apiVerifyPayment} from '../../utils/api';


const StripePayment = (props) => {
	const [paymentMessage, setPaymentMessage] = React.useState("");
	const [paying, setPaying] = React.useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const payNow = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setPaying(true);
		const paymentResult = await stripe.confirmCardPayment(props.paymentSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: `${props.details['First Name']} ${props.details['Last Name']}`,
				}
			}
		});

		if (paymentResult.error) {
			//Handle error
			setPaymentMessage(paymentResult.error.message);
			setPaying(false);
		} else {
			if (paymentResult.paymentIntent.status==='succeeded') {
				const verified = await apiVerifyPayment(props.paymentSecret).then(res => res.json());
				setPaying(false);
				if (verified.status==="ok") {	
					props.setPaymentSuccess(true);
					props.confirmBooking();
				} else {
					setPaymentMessage(verified.msg);
				}
			}
		}
	}

	return (
		<Grid item xs={12} style={{marginTop: 20}} container direction="column" spacing={2}>
			<Grid item container justify="center">
				<p style={{margin: 0, marginBottom: 5, color: 'gray', fontSize: '0.8rem', textAlign: 'center'}}> 
					Note: This <b> won't </b> really charge your card. 
				</p>
			</Grid>	
			<Grid item>	
				<form onSubmit={payNow}>		
					<CardElement  options={{
						style: {
							base: {
								fontSize: '1.5rem',
							}
						}
					}}/>
					<input type="submit" style={{display: 'none'}} />
				</form>
			</Grid>
			<Grid item container direction="column" justify="center" alignItems="center" >
				{paymentMessage
					?<p style={{margin: 0, fontSize: '1.1rem', color: 'maroon', textAlign: 'center'}}>
						{paymentMessage}
					</p>
					:""
				}
				<Button color="primary" variant="contained" onClick={payNow} disabled={((!stripe && !elements) || paying)}> 
					{(!stripe && !elements) || paying
						?<CircularProgress style={{height: 20, width: 20, color: 'white'}} />
						:"Pay now"
					} 
				</Button>
			</Grid>
		</Grid>
	);
}

export default StripePayment;