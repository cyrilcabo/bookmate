import Paper from '@material-ui/core/Paper';
import CardContainer from './cardcontainer';
import Typography from '@material-ui/core/Typography';

const PropertyPolicies = (props) => {
	return (
		<CardContainer title={"Property Policies"} style={{minHeight: 200}}>
			<Typography style={{textAlign: 'justify'}}> {props.policies} </Typography>
		</CardContainer>
	);
}

export default PropertyPolicies;