import Link from 'next/link';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import {Typography, Hidden} from '@material-ui/core/';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ApartmentIcon from '@material-ui/icons/Apartment';
import {useState} from 'react';
import NavDrawer from './navdrawer';

const useStyle = makeStyles({
	root: {
		color: "white",
		fontSize: 12,
		margin: 0,
	},
});

const NavBar = (props) => {
	const classes = useStyle();
	const [toggle, toggleDrawer] = useState(false);
	const logged = props.isLogged ?{name: "Account", link: '/account'} :{name: 'Login', link: '/login'};
	const navs = [{name: "Home", link: "/"}, {name: "Top", link: "/top"}, {name: "Offers", link: "/hot"}, {name: "Bookings", link: "/bookings"}, logged];
	const navLinks = (style) => navs.map((item, index) => {
		return <Nav.Item key={index}>
				<Nav.Link>
						<Link href={item.link}>
							<h6 className={style}> {item.name} </h6>
						</Link>
				</Nav.Link>
			</Nav.Item>
	});
	const drawerToggle = () => toggleDrawer((toggle) ?false :true);
	return (
		<div>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Link href="/"><Navbar.Brand> <ApartmentIcon /> BookMate </Navbar.Brand></Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" onClick={drawerToggle} />
					<NavDrawer nav={navLinks()} toggle={toggle} toggleDrawer={drawerToggle}/>
					<Hidden smDown>		
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto" />
							<Nav>
								{navLinks(classes.root)}
							</Nav>
						</Navbar.Collapse>
					</Hidden>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavBar;