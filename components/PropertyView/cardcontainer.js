import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		width: "100%",
		display: 'flex',
		flexDirection: 'column',
	},
	cardTitle: {
		minHeight: 40,
		padding: 5,
		fontSize: '1.8rem',
		color: '#0a4f4f'
	},
	cardContent: {
		minHeight: 60,
		padding: 5,
	}
});

const CardContainer = (props) => {
	const classes = useStyle();
	return (
		<Paper className={[classes.root, props.className].join(" ")} {...props} elevation={3}>
			<Grid item container className={classes.cardTitle} alignItems="center">
				<h6 style={{margin: 0}}> {props.title} </h6>
			</Grid>
			<Divider style={{width: '100%'}} />
			<Grid item container className={classes.cardContent}>
				{props.children}
			</Grid>
		</Paper>
	);
}

export default CardContainer;