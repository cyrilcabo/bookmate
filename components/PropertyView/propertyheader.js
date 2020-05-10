import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		width: '100%',
		height: 200,
		overflow: 'hidden',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		[theme.breakpoints.up('md')]: {
			height: 280,
		},
	},
	gridList: {
		height: '100%',
		flexWrap: 'nowrap',	
	},
}));

const PropertyHeader = (props) => {
	const classes = useStyle();
	
	const [index, setIndex] = React.useState(5);
	
	const hasMore = index < props.images.length;
	const imgSrcs = props.images.slice(0, index);
	
	const updateNext = (e) => {
		if (e.target.scrollLeft+e.target.offsetWidth === e.target.scrollWidth) setIndex(index+5);
	}
	
	const images = imgSrcs.map(tile => {
		return <GridListTile key={tile.id} style={{height: '100%'}}>
			<img src={tile.imgSrc} alt={tile.title} />
			<GridListTileBar title={tile.title} />
		</GridListTile>
	});
	return (
		<div className={classes.root}>	
			<GridList className={classes.gridList} cols={2} onScroll={hasMore ?updateNext :null}>
				{images}
			</GridList>
		</div>
	);
}

export default PropertyHeader;