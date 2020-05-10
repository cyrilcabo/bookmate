import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import CardContainer from '../PropertyView/cardcontainer';

const UserDetails = (props) => {
	const userDetails = () => {
		let result = [];
		for (let val in props.user) {
			result.push(
				<TableRow>
					<TableCell> {val} </TableCell>
					<TableCell> {props.user[val]} </TableCell>
				</TableRow>
			);
		}
		return result;
	}
	return (
		<CardContainer title={"User Details"}>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{userDetails()}
					</TableBody>
				</Table>
			</TableContainer>
		</CardContainer>
	);
}

export default UserDetails;