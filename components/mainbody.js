import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	main: {
		backgroundColor: "#1e2125",
		padding: 15,
		[theme.breakpoints.down("xs")]: {
			marginLeft: 0,
			marginRight: 0,
			paddingLeft: 0,
			paddingRight: 0,
			widtth: "100%",
		},
	},
	fullWidth: {
		[theme.breakpoints.down("xs")]: {
			paddingLeft: 0,
			paddingRight: 0,
		},
	},
	
}));

let MainBody = (props) => {
	const classes = useStyle();
	return (
		<div>
			<br />
			<Container className={classes.fullWidth}>
				<Paper className={[classes.main, props.className].join(" ")}>
					{props.children}
				</Paper>
			</Container>
		</div>
	);
}

export default MainBody;