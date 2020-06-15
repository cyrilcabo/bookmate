import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormDetails from './BookingForm/formdetails';
import FormPayment from './BookingForm/formpayment';
import CardContainer from './PropertyView/cardcontainer';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	btnGroup: {
		flex: 1,
	},
});

const BookingForm = (props) => {
	const classes = useStyle();
	const [state, setState] = React.useState({activeStep: 0});
	const [isDisabled, setDisabled] = React.useState(true);
	const [paymentSecret, setPaymentSecret] = React.useState(null);
	
	const [currentBooking, setBooking] = React.useState({
		"First Name": "", 
		"Last Name": "", 
		"Email Address": "", 
		"Number": "", 
		"Address": "", 
		"Requests": "",
		...props.user.details,
	});
	const [paymentMode, setPaymentMode] = React.useState("Pay at property");
	
	const validate = () => {
		for (let val in currentBooking) {
			setDisabled(true);
			if ((!currentBooking[val] || currentBooking[val].length < 2) && val !== "Requests") return false;
		}
		if (currentBooking["Number"].length < 11) return false;
		if (currentBooking["Email Address"].search(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) return false;
		setDisabled(false);
	}
	
	React.useEffect(() => {
		validate();
	}, [currentBooking]);

	React.useEffect(() => {
		if(state.activeStep !== 0) setDisabled(paymentMode==="Card" ?true :false);
	}, [paymentMode, state.activeStep]);

	const Form = (state.activeStep == 0) 
					?<FormDetails 
						currentBooking={currentBooking} 
						setBooking={setBooking}
						date={props.date}
						setDate={props.setDate}
						validate={validate}
					/> 
					:<FormPayment 
						paymentMode={paymentMode}
						setPaymentMode={setPaymentMode}
						price={props.price}
						setDisabled={setDisabled}
						details={currentBooking}
						confirmBooking={props.confirmBooking}
						paymentSecret={paymentSecret}
						setPaymentSecret={setPaymentSecret}
					/>;
	const handleBack = () => {
		setDisabled(false);
		setState({...state, activeStep: 0});
	}
	const handleNext = () => {
		switch (state.activeStep) {
			case 0:
				break;
			case 1:
				props.confirmBooking(currentBooking, paymentMode);
				break;
			default: return false;
		}
		setState({...state, activeStep: 1});
	};
	return (
		<CardContainer title={(state.activeStep == 0) ?"User details: " :"Payment method: "} className={classes.root}>
			<Grid item className={classes.btnGroup}>
				{Form}
			</Grid>
			<Grid item container justify="center" spacing={2} style={{marginTop: 20}}>
				<Grid item>
					<Button 
						variant="contained" 
						disabled={(state.activeStep==0 || props.confirming) ?true :false} 
						onClick={handleBack}
					> Back </Button>
				</Grid>
				<Grid item>
					<Button 
						variant="contained" 
						disabled={isDisabled || props.confirming}
						onClick={handleNext}
						color={(state.activeStep==0) ?"primary" :"secondary"}
					> {(state.activeStep==0) ?"Next" :"Confirm"} </Button>
				</Grid>
			</Grid>
		</CardContainer>
	);
}

export default BookingForm;