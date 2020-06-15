//Utils
import Link from 'next/link';
import {useState} from 'react';

//Material Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

//Material Icon
import ApartmentIcon from '@material-ui/icons/Apartment';
import MenuIcon from '@material-ui/icons/Menu';

//Custom Icon
import {CheckIn} from '../../public/svg-icons';

//Custom components
import NavDrawer from './navdrawer';

const useStyle = makeStyles({
	navLink: {
		color: "#f4f5f5",
		fontSize: 17,
		margin: '0px 15px 0px 0px',
		cursor: 'pointer',
	},
	appLogo: {
		backgroundColor: 'black',
		border: '1px solid #f3f351',
	},
	appTitle: {
		flex: 1,
		fontSize: 20,
	},
});

const NavBar = (props) => {
	const classes = useStyle();
	//Drawer state
	const [toggle, toggleDrawer] = useState(false);
	//Navigation links (component)
	const navLinks = (style) => props.navs.map((item, index) => {
		return <div key={index}>
				<Link href={item.link}>
					<h6 className={style}> {item.name} </h6>
				</Link>
			</div>
	});
	//Toggles drawer
	const drawerToggle = () => toggleDrawer((toggle) ?false :true);
	return (
		<div style={{marginBottom: 20}}>
			<AppBar style={{backgroundColor: '#0a4f4f'}} position="absolute">
				<Toolbar>
					<Container style={{display: 'flex', alignItems: 'center'}}>
						<Hidden smUp>
							<IconButton onClick={drawerToggle} >
								<MenuIcon style={{color: "white"}} />
							</IconButton>
						</Hidden>
						<Hidden xsDown>
							<IconButton>
								<CheckIn height={30} width={30}/>
							</IconButton>
						</Hidden>
						<h4 className={classes.appTitle}> 
							<b> BOOKMATE </b> 
						</h4>
						<Hidden xsDown>
							{navLinks(classes.navLink)}
						</Hidden>
					</Container>
				</Toolbar>
			</AppBar>
			<NavDrawer nav={props.navs} toggle={toggle} drawerToggle={drawerToggle}/>
			<Toolbar />
		</div>
	);
};

export default NavBar;