import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Calendar from './calendar';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		justifyContent: 'space-around',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	}
}));


const DatePicker = (props) => {
	const classes = useStyle();
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
			<Grid container className={classes.root}>
				<Calendar isDefault={props.isDefault} id="date-inline-picker-1" label="Book from" date={props.date.start} handleDate={handleStartDate} width={props.width} />
				<Calendar isDefault={props.isDefault} id="date-inline-picker-2" label="To" date={props.date.end} handleDate={handleAfterDate} width={props.width} />
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default DatePicker;