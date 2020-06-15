//Material components
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

//Material icons
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

//Custom components
import FilterSettings from '../Filter/filtersettings';

//Utils
import makeStyles from '@material-ui/styles/makeStyles';

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
	
	const submitSearch = (e) => {
		e.preventDefault();
		props.submitSearch();
	}

	return (
		<React.Fragment>
			<Paper  onSubmit={submitSearch} className={classes.search} id="locationsearch" component="form">
				<InputBase onChange={props.handleSearch} value={props.search} className={classes.input} placeholder="Where do you wanna go?" />
				{props.search 
					?<IconButton onClick={props.handleClear} color="secondary">
						<CloseIcon />
					</IconButton>
					: ""
				}
				<Hidden mdUp>
					<Divider className={classes.divider} orientation="vertical" />
					<FilterSettings filters={props.filters} setFilter={props.setFilter} unsetFilter={props.unsetFilter} filtered={props.filtered}/>
				</Hidden>
			</Paper>
		</React.Fragment>
	);
};

export default SearchField;