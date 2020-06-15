import React from 'react';

import Router from 'next/router';

const ScrollToTop = (props) => {
	React.useEffect(() => {
		if (window) {
			Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });
		}
	}, []);
	return props.children;
}

export default ScrollToTop;