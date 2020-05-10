import {Paper, Grid, Typography, IconButton} from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CallIcon from '@material-ui/icons/Call';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		display: "flex",
		padding: 5,
		height: "100%",
	},
});

const PropertyTitle = (props) => {
	const classes = useStyle();
	const details = props.details.map(item => {
		return <Grid>
			{item}
		</Grid>
	});
	return (
		<Paper className={classes.root}>
			<Grid item xs={8}>
				<Typography>
					<h5> {props.title} </h5>
				</Typography>
				<Typography>
					<h6> {props.location} </h6>
				</Typography>
				{details}
			</Grid>
			<Grid item xs={4} container display="column" justify="flex-end" >
				<Grid item>
					<IconButton>
						<FavoriteIcon style={{fill: props.isFavorite ?"red" :""}} />
					</IconButton>
				</Grid>
				<Grid item>
					<IconButton>
						<CallIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default PropertyTitle;