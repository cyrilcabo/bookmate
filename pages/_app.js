import App from 'next/app';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../redux/reducers/reducers';

import {setUser} from '../redux/actions/actions';

import fetch from 'isomorphic-unfetch';
import {applySession} from 'next-session';

import Layout from '../components/layout';

import uniqueID from '../utils/uid';

const BookMate = ({Component, pageProps, store, custom}) => {
	return (
		<Provider store={store} >
			<Layout isLogged={pageProps.isLogged}>	
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

BookMate.getInitialProps = async ({Component, ctx}) => {
	if (ctx.req && !ctx.req.headers.cookie) {
		await applySession(ctx.req, ctx.res, {name: 'bookMate'});
		if (!ctx.req.session.user) {
			ctx.req.session.user = {
				id: uniqueID(),
				isGuest: true,
				bookings: [],
				details: {
					"First Name": "", 
					"Last Name": "", 
					"Email Address": "", 
					"Number": "", 
					"Address": "", 
				}
			}
		}
	}
	const cookie = ctx.req ?{Cookie: ctx.req.headers.cookie} :null;
	const isLogged = await fetch('https://bookmate.herokuapp.com/api/authentication/authenticateuser', {headers: {...cookie}}).then(res => res.json());
	ctx.isLogged = isLogged;
	const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
	return {pageProps: {...pageProps, isLogged}};
}




export default withRedux(makeStore)(BookMate);