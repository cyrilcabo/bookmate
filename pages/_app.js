import App from 'next/app';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../redux/reducers/reducers';

import {setUser} from '../redux/actions/actions';

import Layout from '../components/layout';

import '../src/styles/index.css';

import {apiAuthenticateUser} from '../utils/api';
import ScrollToTop from '../utils/scrolltotop';

const BookMate = ({Component, pageProps, store, custom}) => {
	return (
		<Provider store={store} >
			<ScrollToTop>
				<Layout isLogged={pageProps.isLogged} isHome={pageProps.isHome} >	
					<Component {...pageProps} />
				</Layout>
			</ScrollToTop>
		</Provider>
	);
}

BookMate.getInitialProps = async ({Component, ctx}) => {
	const cookie = ctx.req ?{'Cookie': ctx.req.headers.cookie} :null;
	const isLogged = await apiAuthenticateUser(cookie);
	const isHome = ctx.pathname === '/';
	ctx.isLogged = isLogged;
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
	return {pageProps: {...pageProps, isLogged, isHome}};
}




export default withRedux(makeStore)(BookMate);