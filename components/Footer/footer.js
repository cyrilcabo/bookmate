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
		minHeight: 200,
		backgroundColor: '#070f10',
		marginTop: 50,
		padding: '25px 0px',
		[theme.breakpoints.down('sm')]: {
			padding:'30px 0px',
		}
	},
	container: {
	},
	iconHolder: {
		height: 100,
		width: 220,
		border: '5px solid #0a4f4f',
		borderRadius: 10,
		backgroundColor: '#f6f6f6',
		padding: 5,
		[theme.breakpoints.down('sm')]: {
			alignSelf: 'center',
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
		height: '100%',
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
		cursor: 'pointer',
		'& a': {
			textDecoration: 'none',
			color: 'white',
			'&:hover': {
				color: '#42bdbd',
			},
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.95rem',
		}
	},
	navLinks: {
		'& > div.MuiGrid-item': {
			marginLeft: 40,
			fontSize: '1rem',
			'& p': {
				'&:hover': {
					color: '#f1ea50',
				},
			},
			[theme.breakpoints.down('sm')]: {
				margin: 0,
				padding: 8,
				fontSize: '0.95rem',
			}
		}
	},
	outLinkContainer: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center'
		}
	},
	outLink: {
		height: 25,
		[theme.breakpoints.down('sm')]: {
			height: 23,
		}
	},
	isHome: {
		marginTop: 0,
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
		<Grid item xs={12} className={[classes.root, props.isHome ?classes.isHome :""].join(' ')} container justify="center" alignItems="center">
			<Grid item xs={12} md={10} container className={classes.container} justify="center">
				<Grid item xs={12} md={5} lg={6} container direction="column" justify="space-between" className={classes.brandLogo}>
					<Grid item className={classes.iconHolder} container justify="center" alignItems="center">
						<BookmateIcon className={classes.bookmateLogo} />
					</Grid>
					<Grid item container className={classes.outLinkContainer} justify="flex-start" spacing={1}>
						<Grid item>
							<IconButton onClick={() => window.open("https://web.facebook.com/developmentalpha")}>
								<img src={FacebookIcon} className={classes.outLink} />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton onClick={() => window.open("https://alphadevop.co")}>
								<img src={AlphaDevIcon} className={classes.outLink} />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton onClick={() => window.open("https://twitter.com/alphadev_tac")}>
								<img src={TwitterIcon} className={classes.outLink} />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={7} lg={6} style={{color: '#f5f5f5'}} container direction="column" justify="space-between">
					<Grid item container className={[classes.rightToCenter, classes.brandDetails].join(' ')} direction={"column"}>
						<Grid item>
							<h2 style={{margin: 0}} className={classes.brandTitle}> &copy; Alpha Development 2020 </h2>
						</Grid>
						<Grid item>
							<p className={classes.contacts}> 
								<a href="mailto:cyrilcabo@gmail.com">
									cyrilcabo@gmail.com
								</a> 
							</p>
						</Grid>
						<Grid item>	
							<p className={classes.contacts}> 
								<a href="tel:+639398815697">
									+639398815697 
								</a>
							</p>
						</Grid>
					</Grid>
					<Grid item container className={[classes.rightToCenter, classes.navLinks].join(' ')}>
						{navLinks}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Footer;
