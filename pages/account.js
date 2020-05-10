import MainBody from '../components/mainbody';
import FormDetails from '../components/BookingForm/formdetails';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import {connect} from 'react-redux';

import {fetchUser} from '../redux/actions/actions';

const useStyle = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'white',
		minHeight: '60vh',
	},
	avatar: {
		height: '15vh', 
		width: '15vh'
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	}
});

const Account = (props) => {
	const classes = useStyle();
	const {username, details} = props.user;
	const [editDetails, setEditDetails] = React.useState(false);
	const [pChanging, setPChanging] = React.useState(false);
	const [passwords, setPasswords] = React.useState({npassword: "", cpassword: ""});
	const [error, setError] = React.useState("");
	const [currentBooking, setBooking] = React.useState({
		"First Name": "", 
		"Last Name": "", 
		"Email Address": "", 
		"Number": "", 
		"Address": "", 
		...details,
	});
	
	const validate = () => {
		if (passwords.npassword !== passwords.cpassword) {
			if  (passwords.cpassword) setError("Passwords don't match!");
		} else {
			setError("");
		}
	};
	
	React.useEffect(() => {
		validate();
	}, [passwords]);
	
	const handlePassword = (e) => {
		setPasswords({...passwords, [e.target.id]: e.target.value});
		validate();
	}
	
	const changePassword = async () => {
		if (!(passwords.npassword && passwords.cpassword && !error)) return false;
		setPChanging(true);
		await fetch('https://bookmate.herokuapp.com/api/authentication/changepassword', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				password: passwords.npassword,
			}),
		}).then(res => res.json()).then(res => {
			setPChanging(false);
			if (res.status==="ok") {
				setPasswords({npassword: "", cpassword: ""});
			}
		});
	}
	
	const saveDetails = async () => {
		setEditDetails(false);
		if (!editDetails) return false;
		await fetch('https://bookmate.herokuapp.com/api/authentication/setdetails', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				details: currentBooking,
			}),
		});
	}
	
	const deleteAccount = async () => {
		await fetch('https://bookmate.herokuapp.com/api/authentication/deleteaccount', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({deleteId: props.user.id}),
		}).then(res => res.json()).then((res) => {
			if (res.status==="ok") logout();
		});
	}
	
	const logout = async () => {
		await fetch('https://bookmate.herokuapp.com/api/authentication/logout').then(() => Router.replace('/'));
	}
	
	return (
		<MainBody className={classes.root}>
			<Grid item container xs={12} md={10} spacing={2} justify="center">
				<Grid item xs={12} container justify="center" alignItems="center" direction="column" spacing={2}>
					<Avatar className={classes.avatar}> {username[0]} </Avatar>
					<h4> {username} </h4>
				</Grid>
				<Divider style={{width: '100%'}}/>
				<Grid item xs={12} md={10}>
					<ExpansionPanel>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography> Change password </Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<TextField
								fullWidth
								value={passwords.npassword}
								type="password"
								id="npassword"
								label="New password"
								onChange={handlePassword}
							/>
							<TextField
								fullWidth
								value={passwords.cpassword}
								type="password"
								id="cpassword"
								label="Confirm password"
								onChange={handlePassword}
							/>
							<Button
								variant="outlined"
								color="primary"
								onClick={changePassword}
								style={{marginTop: 10}}
								disabled={!(passwords.npassword && passwords.cpassword && !error) || pChanging}
							>
								Change password
							</Button>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography> Set default details </Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.details}>
							<FormDetails 
								disabled={!editDetails}
								noDate
								currentBooking={currentBooking}
								setBooking={setBooking}
							/>
							<Button 
								fullWidth 
								color={editDetails ?"primary" :"secondary"} 
								variant="outlined" 
								onClick={() => {editDetails ?saveDetails() :setEditDetails(true)}}
							> 
								{editDetails ?"Save" :"Edit" }
							</Button>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<Grid item xs={12} container justify="space-around" alignItems="center" spacing={1} style={{marginTop: 20}}>
						<Grid item xs={12} md={5}>
							<Button variant="contained" color="secondary" onClick={deleteAccount} fullWidth>
								Delete account
							</Button>
						</Grid>
						<Grid item xs={12} md={5}>
							<Button variant="contained" color="primary" onClick={logout} fullWidth>
								Logout
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</MainBody>
	);
}

Account.getInitialProps = async ({req, res, isLogged, store}) => {
	if (!isLogged) {
		if (req) {
			res.writeHead(301, {Location: '/'});
			res.end();
		} else {
			Router.replace('/');
		}
	}
	const cookie = (req) ?{Cookie: req.headers.cookie} :null;
	await fetch('https://bookmate.herokuapp.com/api/fetchuser', {headers: {...cookie}}).then(res => res.json()).then(user => {
		store.dispatch(fetchUser(user));
	});
}

export default connect(state => ({user: state.user}))(Account);