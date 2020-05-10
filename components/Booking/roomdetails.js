import {TableContainer, Table, TableRow, TableBody, TableCell, Paper} from '@material-ui/core';
import CardContainer from '../PropertyView/cardcontainer';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles({
	root: {
		display: "flex",
	}
});

const RoomDetails = (props) => {
	const classes = useStyle();
	const {property, room} = props.booking; 
	
	const bookingDetails = () => {
		const {_id, moredetails, ...selectedProperty} = property;
		let result = [];
		for (let val in selectedProperty) {
			result.push(
				<TableRow>
					<TableCell> Property {val}: </TableCell>
					<TableCell> {typeof(selectedProperty[val])==="string"||typeof(selectedProperty[val])==="number"
						?selectedProperty[val]
						:selectedProperty[val].length
							?selectedProperty[val].join(", ")
							:(() => {
								let semiresults = [];
								for (let items in selectedProperty[val]) {
									if (items==="others") continue;
									semiresults.push(
										<span><span> {selectedProperty[val][items]} </span><br /></span>
									);
								}
								return semiresults;
							})()
					} </TableCell>
				</TableRow>
			);
		}
		return result;
	}
	
	const roomDetails = () => {
		const {_id, imgSrc, ...selectedRoom} = room;
		let result = [];
		for (let val in selectedRoom) {
			result.push(
				<TableRow>
					<TableCell> Room {val}: </TableCell>
					<TableCell> {typeof(selectedRoom[val])==="string"||typeof(selectedRoom[val])==="number"
						?selectedRoom[val]
						:selectedRoom[val].length
							?selectedRoom[val].map(d => (<span><span> {d} </span> <br/></span>))
							:(() => {
								let semiresults = [];
								for (let items in selectedRoom[val]) {
									semiresults.push(
										<span><span> {items}: {selectedRoom[val][items]} </span><br /></span>
									);
								}
								return semiresults;
							})()
					} </TableCell>
				</TableRow>	
			);
		}
		return result;
	}
	return (
		<CardContainer title={"Booking Details"} >
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{roomDetails()}
						{bookingDetails()}
					</TableBody>
				</Table>
			</TableContainer>			
		</CardContainer>
	);
}

export default RoomDetails;