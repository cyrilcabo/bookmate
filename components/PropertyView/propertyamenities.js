import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import CardContainer from './cardcontainer';

const useStyle = makeStyles({
	card: {
		height: "100%",
	},
	root: {
		padding: 5,
	},
	span: {
		padding: 2,
		margin: "2px 2px 2px 0px",
		backgroundColor: "#f4f4a7",
		borderRadius: 2,
		boxShadow: "0 0 1px",
	},
});

const PropertyAmenities = (props) => {
	const classes = useStyle();
	const amenities = props.amenities.map((detail, index) => {
		return <Grid item key={index}>
			<span className={classes.span}>
				{detail}
			</span>
		</Grid>
	});
	return (
		<CardContainer title={"Amenities"} className={classes.card}>
			<Grid className={classes.root} container display="row" spacing={2}>
				{amenities}
			</Grid>
		</CardContainer>
	);
}

export default PropertyAmenities;