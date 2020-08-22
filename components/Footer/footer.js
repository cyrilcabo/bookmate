//Material components
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

//Utils
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from 'next/link';

//Import custom svg icon
import {BookmateIcon} from '../../public/svg-icons';

//Import social icons
import FacebookIcon from '../../public/Footer Icons/Facebook.png';
import TwitterIcon from '../../public/Footer Icons/Twitter.png';
import AlphaDevIcon from '../../public/Footer Icons/Alphadevelopment.png';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 320,
		backgroundColor: 'black',
		marginTop: 50,
		paddingBottom: 10,
	},
	iconHolder: {
		maxHeight: 200,
		maxWidth: 300,
		border: '5px solid #0a4f4f',
		borderRadius: 10,
		backgroundColor: '#f6f6f6',
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			marginBottom: 10,
		}
	},
	brandDetails: {
		'& > div': {
			marginBottom: 10,
		}
	},
	brandTitle: {
		fontSize: '1.3rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem',
		}

	},
	brandLogo: {
		justifyContent: 'flex-start',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	bookmateLogo: {
		height: 120,
		[theme.breakpoints.down('sm')]: {
			height: 80,
		}
	},
	rightToCenter: {
		textAlign: 'right',
		alignContents: 'flex-end',
		justifyContent: 'flex-end',
		[theme.breakpoints.down('sm')]: {
			textAlign: 'center',
			alignContents: 'center',
			justifyContent: 'center',
		},
	},
	contacts: {
		fontSize: '1rem',
		margin: 0,
	},
	navLinks: {
		'& > div.MuiGrid-item': {
			marginLeft: 40,
			fontSize: '1rem',
			[theme.breakpoints.down('sm')]: {
				margin: 0,
				padding: 8,
				fontSize: '0.95rem',
			}
		}
	},
	outLink: {
		height: 40,
		[theme.breakpoints.down('md')]: {
			height: 35,
		},
		[theme.breakpoints.down('sm')]: {
			height: 30,
		}
	}
}))

const Footer = (props) => {
	const classes = useStyle();
	const navLinks = props.navs.map((item, index) => {
		return (
			<Grid item key={index}>
				<Link href={item.link}>
					<p style={{cursor: 'pointer'}}> {item.name} </p>
				</Link>
			</Grid>
		);
	});
	return (
		<Grid item xs={12} className={classes.root} container justify="center">
			<Grid item xs={12} md={10} container style={{margin: '50px 0px 0px 0px'}} justify="center">
				<Grid item xs={12} md={6} container alignItems="flex-start" className={classes.brandLogo}>
					<Grid item className={classes.iconHolder} container justify="center" alignItems="center">
						<BookmateIcon className={classes.bookmateLogo} />
					</Grid>
				</Grid>
				<Grid item xs={12} md={6} style={{color: '#f5f5f5'}} container direction="column" justify="space-between">
					<Grid item container className={[classes.rightToCenter, classes.brandDetails].join(' ')} direction={"column"}>
						<Grid item>
							<h2 style={{margin: 0}} className={classes.brandTitle}> &copy; Alpha Development 2020 </h2>
						</Grid>
						<Grid item>
							<p className={classes.contacts}> cyrilcabo@gmail.com </p>
						</Grid>
						<Grid item>
							<p className={classes.contacts}> +639398815697 </p>
						</Grid>
					</Grid>
					<Grid item container className={[classes.rightToCenter, classes.navLinks].join(' ')}>
						{navLinks}
					</Grid>
				</Grid>
				<Divider style={{backgroundColor: '#dceb5c', width: '80%', height: 5}}/>
				<Grid item xs={12} container justify="center" spacing={2}>
					<Grid item>
						<IconButton onClick={() => window.open("https://web.facebook.com/developmentalpha")}>
							<img src={FacebookIcon} className={classes.outLink} />
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton>
							<img src={AlphaDevIcon} className={classes.outLink} onClick={() => window.open("https://alphadevop.co")} />
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton onClick={() => window.open("https://twitter.com/alphadev_tac")}>
							<img src={TwitterIcon} className={classes.outLink} />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Footer;
