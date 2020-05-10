import LocationSearch from './Search/locationsearch';
import DatePicker from './Search/datepicker';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const BookSearch = (props) => {
	return (
		<div>
			<FormControl fullWidth>
				<DatePicker 
					setDate={props.setDate}
					date={props.date}
				/>
				<LocationSearch
					filters={props.filters}
					setFilter={props.setFilter}
					unsetFilter={props.unsetFilter}
					filtered={props.filtered}
					handleLocation={props.handleLocation}
					setSearch={props.setSearch}
				/>
			</FormControl>
		</div>
	);
};

export default BookSearch;
	