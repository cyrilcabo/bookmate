import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		overflow: 'hidden',
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	gridList: {
		height: '100%',
		flexWrap: 'nowrap',	
	},
	img: {
		minHeight: 220,
		maxHeight: 310,
		[theme.breakpoints.down('sm')]: {
			minHeight: 150,
			maxHeight: 250,
		}
	},
	tile: {
		maxWidth: '100%',
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
	
	const images = imgSrcs.map((tile, index) => {
		return <GridListTile key={index} style={{width: 'inherit', height: '100%'}} className={classes.tile}>
				<img src={tile.imgSrc} alt={tile.title} className={classes.img} />
			<GridListTileBar title={tile.title} />
		</GridListTile>
	});
	return (
		<div className={classes.root}>	
			<GridList className={classes.gridList} onScroll={hasMore ?updateNext :null}>
				{images}
			</GridList>
		</div>
	);
}

export default PropertyHeader;