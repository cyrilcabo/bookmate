import React from 'react';
import SearchField from './searchfield';
import SearchResults from './searchresults';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'

import makeStyles from '@material-ui/core/styles/makeStyles';

import SearchIcon from '@material-ui/icons/Search';

import fetch from 'isomorphic-unfetch';

import {apiFetchSearch} from '../../utils/api';

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
	//UI search state
	const [searching, setSearching] = React.useState(false);
	const handleSearch = async (e) => {
		setSearch(e.target.value);
		setOpen(true);
		setAnchor(e.target.parentElement.parentElement);
		setSearching(true);
		const results = await apiFetchSearch(e.target.value).then(res => res.json()).then(data => {
			setSearching(false);
			return data.result;
		});
		setResults(results);
	};
	const handleSelectLocation = (e) => {
		setSearch(e.location);
		props.handleLocation(e._id);
		setOpen(false);
	};
	const submitSearch = () => {
		if (results.length) {
			handleSelectLocation(results[0]);
		}
	}
	const handleClickAway = () => setOpen(false);
	const handleClear = () => {
		setSearch("");
		setResults(results);
	};
	return (
		<Grid container item xs={12}>
			<Grid item xs={12} md={10}>
				<FormControl fullWidth>
					<SearchField 
						handleClear={handleClear} 
						handleSearch={handleSearch}
						search={search} 
						filters={props.filters} 
						setFilter={props.setFilter} 
						unsetFilter={props.unsetFilter}
						filtered={props.filtered}
						submitSearch={submitSearch}
					/>
					<SearchResults 
						anchorEl={anchorEl}
						open={open} 
						results={results} 
						handleClickAway={handleClickAway} 
						handleSelectLocation={handleSelectLocation}
						searching={searching}
					/>
				</FormControl>
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