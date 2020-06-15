import FilterButton from './filterbutton';
import FilterOptions from './filteroptions';
import React from 'react';

const FilterSettings = (props) => {
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchor] = React.useState(null);
	
	let handleClick = (e) => {
		setOpen((open) ?false :true);
		setAnchor(e.target.parentElement);
	}
	
	let handleClickAway = () => setOpen(false);
	
	return (
		<React.Fragment>
			<FilterButton handleClick={handleClick} />
			<FilterOptions 
				open={open} 
				anchorEl={anchorEl} 
				handleClickAway={handleClickAway} 
				setFilter={props.setFilter}
				unsetFilter={props.unsetFilter}
				filters={props.filters}
				filtered={props.filtered}
			/>
		</React.Fragment>
	);
}

export default FilterSettings;