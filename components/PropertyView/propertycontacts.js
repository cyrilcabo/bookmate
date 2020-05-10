import Paper from '@material-ui/core/Paper';
import CardContainer from './cardcontainer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		marginBottom: 5,
	},
});

const PropertyContacts = (props) => {
	const classes = useStyle();
	const {phone, email, others} = props.contacts;
	const otherContacts	= () => {
		let result = [];
		for (let values in others) {
			result.push(
				<Grid container justify="space-between">
					<Grid> {values}: </Grid> <Grid> {others[values]} </Grid>
				</Grid>
			);
		}
		return result;
	}
	return (
		<CardContainer title={"Contacts"} className={classes.root}>
			<Grid container item xs={12} justify="center">
				<Grid container direction="column" alignItems="center" item sm={11} xs={12}>
					<Grid container justify="space-between"> 
						<Grid> Phone: </Grid> <Grid> {phone} </Grid>
					</Grid>
					<Grid container justify="space-between"> 
						<Grid> Email: </Grid> <Grid> {email} </Grid>
					</Grid>
					{otherContacts()}
				</Grid>
			</Grid>
		</CardContainer>
	);
}

export default PropertyContacts;