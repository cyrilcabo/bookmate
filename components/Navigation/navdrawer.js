//Material components
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

//Utils
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from 'next/link';

//Material Icons
import HomeIcon from '@material-ui/icons/Home';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PersonIcon from '@material-ui/icons/Person';

//Custom svg icons
import {CheckIn} from '../../public/svg-icons';

const useStyles = makeStyles({
	root: {
		'& > div.MuiPaper-root': {
			color: '#0a4f4f',
		}
	},
	fullList: {
		width: 250,
	},
	listHeader: {
		margin: 10,
		textAlign: "center",
	},
});

const NavDrawer = (props) => {
	const classes = useStyles();
	//Navigation Icons 
	const icons = [<HomeIcon />, <WhatshotIcon />, <LocalOfferIcon />, <HotelIcon />, <PersonIcon />];
	//Navigation items
	const navDrawer = props.nav.map((item, index) => {
		return <Link href={item.link} key={index}>
			<ListItem button key={index} onClick={() => props.drawerToggle()}>
				<ListItemIcon> {icons[index]} </ListItemIcon>
				<ListItemText primary={item.name} />
			</ListItem>
		</Link>;
	});
	return (		
		<Hidden mdUp>
			<Drawer open={props.toggle} onClose={props.drawerToggle} className={classes.root}>
				<ListSubheader color="inherit" className={classes.listHeader}> 
					<CheckIn width={60} height={70} />
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