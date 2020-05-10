import makeStyles from '@material-ui/styles/makeStyles';
import {Paper, InputBase, IconButton, Divider} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import FilterSettings from '../filtersettings';

const useStyle = makeStyles({
	search: {
		display: "flex",
		alignItems: "center",
	},
	divider: {
		height: 20,
	},
	input: {
		flex: 1,
		padding: 8,
	},
});


const SearchField = (props) => {
	const classes = useStyle();
	
	return (
		<React.Fragment>
			<Paper  onSubmit={(e) => e.preventDefault()} className={classes.search} id="container" component="form">
				<InputBase onChange={props.handleSearch} value={props.search} className={classes.input} placeholder="Where do you wanna go?" />
				{props.search 
					?<IconButton onClick={props.handleClear} color="secondary">
						<CloseIcon />
					</IconButton>
					: ""
				}
				<Divider className={classes.divider} orientation="vertical" />
				<FilterSettings filters={props.filters} setFilter={props.setFilter} unsetFilter={props.unsetFilter} filtered={props.filtered}/>
			</Paper>
		</React.Fragment>
	);
};

export default SearchField;