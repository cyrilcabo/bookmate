import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';

const useStyle = makeStyles({
	container: {
		width: "100%",
		zIndex: 2,
	},
	searchRes: {
		margin: 1,
		width: "100%",
	},
	text: {
		flex: 1,
	},
	resultItem: {
		'&:hover' : {
			backgroundColor: "#343a40",
			boxShadow: "0px 0px 5px",
			borderRadius: 5,
		}
	}
});

const SearchResults = (props) => {
	const classes = useStyle();

	const results = props.results.map((item) => {
		return (
			<React.Fragment key={item._id}>
				<ListItem onClick={props.handleSelectLocation.bind(this, item)} className={classes.resultItem}>
					<ListItemText
						primary={
							<Grid container>
								<Typography className={classes.text}> {item.location} </Typography>
								<Typography color="secondary" > {item.properties} properties </Typography>
							</Grid>
						}
						secondary={item.address}
					/>
				</ListItem>
				<Divider component="li" />
			</React.Fragment>
		);
	});
			
	return (
		<React.Fragment>
			<Popper container={props.anchorEl} className={classes.container} open={props.open} placement={"bottom-start"} anchorEl={props.anchorEl} transition>
				{({TransitionProps}) => (
					<Fade {...TransitionProps} timeout={250}>
						<Paper className={classes.searchRes}>			
							<ClickAwayListener onClickAway={props.handleClickAway} >
									<List>
										{props.results.length
											?results
											:props.searching
												? <ListItem> 
													<ListItemText
														primary={<CircularProgress />}
														secondary={"Searching..."}
													/>
												</ListItem>
												: <ListItem>
													<ListItemText
														primary="Sorry no results are found..."
														secondary="Try other locations..."
													/>
											 	</ListItem>
										}
									</List>
							</ClickAwayListener>
						</Paper>
					</Fade>
				)}
			</Popper>
		</React.Fragment>
	);
};

export default SearchResults;