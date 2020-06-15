import React from 'react';
import {FormControlLabel, FormControl, FormGroup, FormLabel, Checkbox, Grid, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	label: {
		padding: 5,
		textAlign: "center",
		color: '#0a4f4f'
	},
});

const Filter = (props) => {
	const classes = useStyle();
	const handleChange = (item) => {
		if (item == props.filtered.find(i => item==i)) {
			props.unsetFilter(item);
			return false;
		}
		props.setFilter(item);
		
	};
	const filters = props.filters.map((item, index) => {
		return (
			<Grid item key={index}>	
				<FormControlLabel
					control={ 
						<Checkbox
							checked={(props.filtered.find(i => i==item)) ?true :false}
							onChange={handleChange.bind(this, item)}
							value={item}
							style={{
								color: '#0a4f4f'
							}}
						/>
					}	
					label={item}
				/>
			</Grid>
			);
	});
	return (
		<FormControl component="fieldset" style={props.style}>
			<FormLabel className={classes.label}> Filters </FormLabel>
			<FormGroup>
				<Grid container direction="row" justify="center">
					{filters}
				</Grid>
			</FormGroup>
		</FormControl>
	);
}

export default Filter;