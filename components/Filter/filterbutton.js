import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Hidden from '@material-ui/core/Hidden';

const FilterButton = (props) => {
	return (
		<IconButton variant="contained" color="primary" onClick={props.handleClick}>
			<SettingsIcon />
		</IconButton>
	);
}

export default FilterButton;