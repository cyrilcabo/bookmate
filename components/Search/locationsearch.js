import React from 'react';
import SearchField from './searchfield';
import SearchResults from './searchresults';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';

import fetch from 'isomorphic-unfetch';

const useStyle = makeStyles(theme => ({
	button: {
		height: "100%",
		[theme.breakpoints.down("sm")]: {
			marginTop: 10,
		}
	}
}));

const LocationSearch = (props) => {
	const classes = useStyle();
	const [search, setSearch] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchor] = React.useState(null);
	const [results, setResults] = React.useState([]);
	let handleSearch = async (e) => {
		setSearch(e.target.value);
		setOpen(true);
		setAnchor(e.target.parentElement.parentElement);
		
		const results = await fetch(`http://localhost:3000/api/fetchsearch?location=${e.target.value}`).then(res => res.json()).then(data => data.result);
		setResults(results);
	};
	let handleSelectLocation = (e) => {
		setSearch(e.location);
		props.handleLocation(e._id);
		setOpen(false);
	};
	let handleClickAway = () => setOpen(false);
	let handleClear = () => {
		setSearch("");
		setResults(results);
	};
	return (
		<Grid container xs item={12}>
			<Grid item xs={12} md={10}>
				<SearchField 
					handleClear={handleClear} 
					handleSearch={handleSearch}
					search={search} 
					filters={props.filters} 
					setFilter={props.setFilter} 
					unsetFilter={props.unsetFilter}
					filtered={props.filtered}
				/>
				<SearchResults 
					anchorEl={anchorEl}
					open={open} 
					results={results} 
					handleClickAway={handleClickAway} 
					handleSelectLocation={handleSelectLocation}
				/>
			</Grid>
			<Grid item xs={12} md={2}>
				<Button className={classes.button} onClick={props.setSearch} fullWidth variant="contained" color="primary"> 
					Search <SearchIcon />
				</Button>
			</Grid>
		</Grid>
	);
};

export default LocationSearch;