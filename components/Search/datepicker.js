import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Calendar from './calendar';


const DatePicker = (props) => {
	const handleStartDate = (date) => {;
		if (date.isSameOrAfter(props.date.end, "day")){
			props.setDate({...props.date, start: date, end: moment(date).add(1, "days")});
		} else {
			props.setDate({...props.date, start: date});
		}
	};
	const handleAfterDate = (date) => {
		if (date.isSameOrBefore(props.date.start, "day")) {
			if (date.isSameOrBefore(moment(), "day")) return false;
			props.setDate({...props.date, end: date, start: moment(date).subtract(1, "days")});
		} else {
			props.setDate({...props.date, end: date});
		}
	};
	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Grid container justify="space-around">
				<Calendar isDefault={props.isDefault} label="Book from" date={props.date.start} handleDate={handleStartDate}/>
				<Calendar isDefault={props.isDefault} label="To" date={props.date.end} handleDate={handleAfterDate} />
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default DatePicker;