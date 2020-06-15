import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import CardContainer from '../PropertyView/cardcontainer';

const UserDetails = (props) => {
	const userDetails = () => {
		let result = [];
		for (let val in props.user) {
			result.push(
				<TableRow key={val}>
					<TableCell> {val} </TableCell>
					<TableCell> {props.user[val]} </TableCell>
				</TableRow>
			);
		}
		return result;
	}
	return (
		<CardContainer title={"User Details"}>
			<TableContainer>
				<Table>
					<TableBody>
						{props.id
							? <TableRow>
								<TableCell> Booking ID: </TableCell>
								<TableCell> {props.id} </TableCell>
							</TableRow>
							: ""
						}
						{userDetails()}
					</TableBody>
				</Table>
			</TableContainer>
		</CardContainer>
	);
}

export default UserDetails;