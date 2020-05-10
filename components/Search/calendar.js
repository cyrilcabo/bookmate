import {KeyboardDatePicker} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles({
	datepicker: {
		"& label.MuiFormLabel-root": {
			color: "gray",
			zIndex: 0,
		},
		"& div.MuiInputBase-root": {
			color: "white",
			"& fieldset": {
				borderColor: "gray",
				zIndex: 0,
			},
			"& div>button>span>svg.MuiSvgIcon-root" : {
				fill: "gray",
				zIndex: 0,
			},
		},
		
	},
});

const Calendar = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} md={5}>
			<KeyboardDatePicker
				className={props.isDefault ?"" :classes.datepicker}
				fullWidth
				disablePast
				disableToolbar
				autoOk
				margin="none"
				color="primary"
				inputVariant="outlined"
				variant="inline"
				format="MMMM DD, YYYY"
				margin="normal"
				id="date-picker-inline"
				label={props.label}
				value={props.date}
				onChange={props.handleDate}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</Grid>
	);
};

export default Calendar;