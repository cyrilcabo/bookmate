import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		padding: 5,
		margin: 1,
		width: "100%",
	}
});

const CardContainer = (props) => {
	const classes = useStyle();
	return (
		<Paper className={[classes.root, props.className].join(" ")}>
			<h6> {props.title} </h6>
			<Divider />
			{props.children}
		</Paper>
	);
}

export default CardContainer;