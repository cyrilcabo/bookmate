import Head from 'next/head';
import NavBar from './navbar';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

const Layout = (props) => {
	return (
		<div>
			<Head>
				<title> Bookmate </title>
				<link rel="stylesheet" href="/bootstrap.css" />
			</Head>
			<NavBar isLogged={props.isLogged} />
			<ThemeProvider>
				{props.children}
			</ThemeProvider>
		  <style global jsx>{`
			  body {
				  background-color: #eceeef;
			  }
		  `}</style>
		</div>
	);
}

export default Layout;