//Material components
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

//Custom components
import CardContainer from '../PropertyView/cardcontainer';

//utils
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
	},
	detailsContainer: {
		display: 'flex', 
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			marginBottom: 20,
		}
	}
}));

const RoomDetails = (props) => {
	const classes = useStyle();
	const {property, room} = props; 
	const details = (root, title) => {
		const {imgSrc, _id, ...selected} = root;
		let result = [];
		for (let val in selected) {
			result.push(
				<TableRow key={val}>
					<TableCell> {title} {val}: </TableCell>
					<TableCell> {typeof(selected[val])==="string" || typeof(selected[val])==="number"
						?val=="price"
							?`P${selected[val]}`
							:selected[val]
						:selected[val].length
							?selected[val].join(", ")
							:(() => {
								let semiresults = [];
								for (let items in selected[val]) {
									if (items==="others") continue;
									semiresults.push(
										<span key={items}><span> {selected[val][items]} </span><br /></span>
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
		<Grid className={classes.detailsContainer} item xs={12}>
			<Grid item container>	
				<CardContainer title={"Room Details"} >
					<TableContainer>
						<Table>
							<TableBody>
								{details(room, "Room")}
							</TableBody>
						</Table>
					</TableContainer>			
				</CardContainer>
			</Grid>
			<Grid item container>
				<CardContainer title={"Property Details"} >
					<TableContainer>
						<Table>
							<TableBody>
								{details(property, "Property")}
							</TableBody>
						</Table>
					</TableContainer>			
				</CardContainer>
			</Grid>
		</Grid>
	);
}

export default RoomDetails;