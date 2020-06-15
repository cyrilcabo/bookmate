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
		let string = e.target.value;
		if (string.length) {	
			switch (prop) {
				case "First Name":
				case "Last Name":
				case "Address":
				case "Requests":
					string = string[0].toUpperCase()+string.slice(1);
					break;
				case "Number":
					if (string.search(/^[0-9]+/) || string.length > 11) return false;
					break;
				default: break;
			}
		}
		props.setBooking({...props.currentBooking, [prop]: string});
	}
	const fields = () => {
		let result = [];
		for (let items in props.currentBooking) {
			const size = (items == "First Name" || items == "Last Name") ?6 :12;
			const multi = (items == "Requests") ?true :false;
			result.push(
				<Grid xs={size} item key={items}>
					<TextField 
						fullWidth 
						value={props.currentBooking[items]} 
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
		<Grid container item xs={12} spacing={1} className={classes.root}>
			{props.noDate
				?""
				:<Grid item xs={12}>
					<DatePicker date={props.date} setDate={props.setDate} isDefault width={{xs: 12}}/>
				</Grid>
			}
			{fields()}
		</Grid>	);
}

export default FormDetails;