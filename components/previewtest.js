import {Paper, List, ListItem, Divider, Grid, Typography} from '@material-ui/core/';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CheckIcon from '@material-ui/icons/Check';

const useStyle = makeStyles(theme => ({
	root: {
		marginBottom: 6,
		minHeight: "30vh",
		[theme.breakpoints.down("sm")]: {
			paddingLeft: 1,
			paddingRight: 0,
			marginLeft: 0,
			marginRight: 0,
		}
	},
	fullWidth: {
		[theme.breakpoints.down("xs")]: {
			paddingLeft: 1,
			paddingRight: 0,
		}
	},
	filter: {
		marginBottom: 5,
		paddingTop: 5,
	},
	danger: {
		color: "#f50057",
		textAlign: "center",
	},
}));

const PreviewTest = (props) => {
	const classes = useStyle();
	const {filter, location} = props;	
	const propertyItems = props.children.map((item) => {
		return (
			<ListItem className={classes.fullWidth} >
				{item}
			</ListItem>
		); 
	});
	const filters = (filter) ?filter.map((item) => {
		return (
			<Grid item xs={6} md={3} container justify="space-between">
				<div style={{display: "flex", justifyContent: "center"}}> <CheckIcon /> {item} </div>
			</Grid>
		);
	}) :"";
	return (
		<Paper className={[classes.root, props.className].join(" ")} elevation={5}>
			{(location || filter)
				? <div>
					<Grid container className={classes.filter} direction="row">
						<Grid item xs={3} sm={2} container justify="center">
							<Typography color="secondary" style={{textAlign: "center"}}> Showing results for: </Typography>
						</Grid>
						<Grid item container xs={9} sm={10} justify="flex-start" direction="row">
							{(location)
								? <Grid item xs={6} md={3} container justify="space-between"> <div> <CheckIcon />{location} </div> </Grid>
								: ""}
							{filters}
						</Grid>
					</Grid>
					<Divider />
				  </div>
				: ""
			}
			<List>
				{(props.children.length)
					?propertyItems
					: <h6 className={classes.danger}> Sorry, no properties are available... </h6>
				}
			</List>
		</Paper>
	);
}

export default PreviewTest;