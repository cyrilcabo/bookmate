import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import DatePicker from '../Search/datepicker';

const useStyle = makeStyles({
	root: {
		padding: 5,
	}
})


const FormDetails = (props) => {
	const classes = useStyle();
	
	const setBooking = (prop, e) => {
		props.setBooking({...props.currentBooking, [prop]: e.target.value});
	}
	const fields = () => {
		let result = [];
		for (let items in props.currentBooking) {
			const size = (items == "First Name" || items == "Last Name") ?6 :12;
			const multi = (items == "Requests") ?true :false;
			result.push(
				<Grid xs={size} item>
					<TextField 
						fullWidth 
						value={props.currentBooking[items]} 
						id="outlined-basic" 
						label={items} 
						multiline={multi} 
						onChange={setBooking.bind(this, items)} 
						disabled={(props.disabled) ?true: false}
					/>
				</Grid>
			);
		}
		return result;
	};
	return (
		<form className={classes.root}>
			<Grid container item xs={12} spacing={1}>
				{props.noDate
					?""
					:<Grid item xs={12}>
						<DatePicker date={props.date} setDate={props.setDate} isDefault/>
					</Grid>
				}
				{fields()}
			</Grid>
		</form>
	);
}

export default FormDetails;