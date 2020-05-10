import {Hidden, List, ListSubheader, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Typography} from '@material-ui/core/';
import {makeStyles} from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PersonIcon from '@material-ui/icons/Person';
import ApartmentIcon from '@material-ui/icons/Apartment';

const useStyles = makeStyles({
	fullList: {
		width: 250,
	},
	listHeader: {
		margin: 10,
		textAlign: "center",
	},
});

let NavDrawer = (props) => {
	const icons = [<HomeIcon />, <WhatshotIcon />, <LocalOfferIcon />, <HotelIcon />, <PersonIcon />];
	const classes = useStyles();
	let navDrawer = props.nav.map((link, index) => {
		return (
		<div key={index}>
			<ListItem button>
				<ListItemIcon> {icons[index]} </ListItemIcon>
				<ListItemText primary={link} />
			</ListItem>
		</div>
		);
	});
	return (		
		<Hidden mdUp>
			<Drawer open={props.toggle} onClose={props.toggleDrawer}>
				<ListSubheader color="inherit" className={classes.listHeader}> 
					<ApartmentIcon />
					<Typography variant="h6" component="h5"> BookMate </Typography>
				</ListSubheader>
				<Divider component="li" />
				<div className={classes.fullList}>
					<List>
						{navDrawer}
					</List>
				</div>
			</Drawer>
		</Hidden>
	);
}

export default NavDrawer;