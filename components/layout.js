import Head from 'next/head';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import Footer from './Footer/footer';
import NavBar from './Navigation/navbar';

import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme();

const Layout = (props) => {
	//Checks whether to render 'Account' or 'Login'
	const logged = props.isLogged ?{name: "Account", link: '/account'} :{name: 'Login', link: '/login'};
	//Navigation links (object)
	const navs = [{name: "Home", link: "/"}, {name: "Top", link: "/top"}, {name: "Offers", link: "/hot"}, {name: "Bookings", link: "/bookings"}, logged];
	return (
		<div>
			<Head>
				<title> Bookmate </title>
			</Head>
			<NavBar isLogged={props.isLogged} navs={navs}/>
			<ThemeProvider theme={theme}>
				<Grid item xs={12}>
					{props.children}
					<Footer navs={navs} isHome={props.isHome} />
				</Grid>
			</ThemeProvider>
		  <style global jsx>{`
		  	  html {
		  	  	scroll-behavior: smooth;
		  	  }
			  body {
				  background-color: white;
				  margin: 0;
			  }
		  `}</style>
		</div>
	);
}

export default Layout;