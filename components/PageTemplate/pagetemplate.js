//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

//Utils
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	titleDesign: {
		width: 20,
		height: 40,
		marginLeft: 10,
		'&#tD1': {
			backgroundColor: '#e1da0b',
		},
		'&#tD2': {
			backgroundColor: '#0a4f4f',
		},
		'&#tD3': {
			backgroundColor: '#6dbfbf',
		},
		[theme.breakpoints.down('xs')]: {
			height: 25,
			width: 10,
			marginLeft: 3,
		}
	},
	title: {
		margin: 0, 
		fontSize: '3rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.5rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem'
		}
	},
	bottomDesign: {
		'& > div.MuiGrid-item': {
			height: 15,
			marginTop: 3,
		}
	},
}));

const PageTemplate = (props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} md={10} direction={"column"} container style={{marginTop: 20}} spacing={2}>
			<Grid item container alignItems="center" justify="space-between">
				<Grid item>
					<h1 className={classes.title}> {props.title} </h1>
				</Grid>
				<Grid item style={{display: 'flex', alignItems: "center"}}>
					<div className={classes.titleDesign} id={"tD1"} />
					<div className={classes.titleDesign} id={"tD2"} />
					<div className={classes.titleDesign} id={"tD3"} />
				</Grid>
				<Grid item xs={12}>
					<Divider style={{width: '100%', height: 5, backgroundColor: '#0a4f4f'}} />
				</Grid>
			</Grid>
			<Grid item container justify="center" style={{minHeight: 500, backgroundColor: '#f2f4f4'}}>
				{props.children}
			</Grid>
			<Grid item container direction="column" className={classes.bottomDesign}>
				<Grid item style={{backgroundColor: '#f3f351'}} />
				<Grid item style={{backgroundColor: '#0a4f4f'}} />
				<Grid item style={{backgroundColor: '#6dbfbf'}} />
			</Grid>
		</Grid>
	);
}

export default PageTemplate;