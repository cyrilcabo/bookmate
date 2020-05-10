import {Popper, Fade, Paper, ClickAwayListener} from '@material-ui/core/';
import Filter from './filter';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		padding: 5,
		zIndex: 2,
	}
});

const FilterOptions = (props) => {
	const classes = useStyle();
	return (
		<Popper anchorEl={props.anchorEl} open={props.open} placement="bottom" transition>
			{({TransitionProps}) =>(
				<Fade {...TransitionProps} timeout={150}>
					<ClickAwayListener onClickAway={props.handleClickAway}>
						<Paper className={classes.root}>
							<Filter setFilter={props.setFilter} unsetFilter={props.unsetFilter} filters={props.filters} filtered={props.filtered} />
						</Paper>
					</ClickAwayListener>
				</Fade>
			)}
		</Popper>
	);
}

export default FilterOptions;