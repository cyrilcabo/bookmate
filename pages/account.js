import PageTemplate from '../components/PageTemplate/pagetemplate';
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
import {apiFetchUser, apiChangePassword, apiDeleteAccount, apiSetDetails, apiLogout} from '../utils/api';

const useStyle = makeStyles(theme => ({
	avatar: {
		height: 150, 
		width: 150,
		backgroundColor: '#0a4f4f',
		fontSize: '4rem',
		[theme.breakpoints.down('xs')]: {
			height: 100,
			width: 100,
			fontSize: '3rem'
		}
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	errMsg: {
		color: 'red',
		margin: 0,
		textAlign: 'center'
	},
	successMsg: {
		color: 'green',
		margin: 0,
		textAlign: 'center'
	}
}));

const Account = (props) => {
	const classes = useStyle();
	const {username, details} = props.user;
	const [editDetails, setEditDetails] = React.useState(false);
	const [disabled, setDisabled] = React.useState(true);
	const [pChanging, setPChanging] = React.useState(false);
	const [passwords, setPasswords] = React.useState({npassword: "", cpassword: ""});
	const [error, setError] = React.useState("");
	const [status, setStatus] = React.useState({password: {err: false, msg: ''}, details: {err: false, msg: ''}});
	const [currentBookingDetails, setBooking] = React.useState({
		"First Name": "", 
		"Last Name": "", 
		"Email Address": "", 
		"Number": "", 
		"Address": "", 
		...details,
	});
	
	const validatePasswords = () => {
		if (passwords.npassword !== passwords.cpassword) {
			if  (passwords.cpassword) setError("Passwords don't match!");
		} else {
			setError("");
		}
	};

	const validateDetails = () => {
		for (let val in currentBookingDetails) {
			setDisabled(true);
			if ((!currentBookingDetails[val] || currentBookingDetails[val].length < 2) && val !== "Requests") return false;
		}
		if (currentBookingDetails["Number"].length < 11) return false;
		if (currentBookingDetails["Email Address"].search(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) return false;
		setDisabled(false);
	}
	
	React.useEffect(() => {
		validatePasswords();
	}, [passwords]);

	React.useEffect(() => {
		validateDetails();
	}, [currentBookingDetails]);
	
	const handlePassword = (e) => {
		setPasswords({...passwords, [e.target.id]: e.target.value});
		validatePasswords();
	}
	
	const changePassword = async () => {
		if (!(passwords.npassword && passwords.cpassword && !error)) return false;
		setStatus({...status, password: {err: false, msg: ''}});
		setPChanging(true);
		await apiChangePassword(passwords.npassword).then(res => res.json()).then(res => {
			setPChanging(false);
			if (res.status==="ok") {
				setStatus({...status, password: {err: false, msg: "Password changed!"}});
				setPasswords({npassword: "", cpassword: ""});
			} else {
				setStatus({...status, password: {err: true, msg: "Something went wrong."}});
			}
		});
	}
	
	const saveDetails = async () => {
		setEditDetails(false);
		setStatus({...status, details: {err: false, msg: ''}});
		if (!editDetails) return false;
		await apiSetDetails(currentBookingDetails).then(res => res.json()).then(result => {
			if (result.status === 'ok') setStatus({...status, details: {err: false, msg: "Details updated!"}});
			else setStatus({...status, details: {err: true, msg: "Something went wrong."}});
		});
	}
	
	const deleteAccount = async () => {
		await apiDeleteAccount(props.user._id).then(res => res.json()).then((res) => {
			if (res.status==="ok") Router.replace('/');
		});
	}
	
	const logout = async () => {
		await apiLogout().then(() => Router.replace('/'));
	}
	
	return (
		<Grid item xs={12} container justify="center">
			<PageTemplate title={"My Account"}>
				<Grid item container xs={12} md={10} spacing={2} justify="center">
					<Grid item xs={12} container justify="center" alignItems="center" direction="column" spacing={2}>
						<Avatar className={classes.avatar}> {username[0]} </Avatar>
						<h4 style={{fontSize: '2rem', margin: 0, marginTop: 10}}> {username} </h4>
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
								{status.password.msg
									?<p className={status.password.err ?classes.errMsg :classes.successMsg}>
										{status.password.msg}
									</p>
									:""
								}
								<form onSubmit={(e) => {e.preventDefault(); changePassword()}}>	
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
									<input type="submit" style={{display: 'none'}} />
								</form>
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
								{status.details.msg
									?<p className={status.details.err ?classes.errMsg :classes.successMsg}>
										{status.details.msg}
									</p>
									:""
								}
								<form onSubmit={(e) => {e.preventDefault(); saveDetails()}}>
									<FormDetails 
										disabled={!editDetails}
										noDate
										currentBooking={currentBookingDetails}
										setBooking={setBooking}
									/>
									<input type="submit" style={{display: 'none'}} />
								</form>
								<Button 
									fullWidth 
									color={editDetails ?"primary" :"secondary"} 
									variant="outlined" 
									onClick={() => {editDetails ?saveDetails() :setEditDetails(true)}}
									disabled={editDetails && disabled}
								> 
									{editDetails ?"Save" :"Edit" }
								</Button>
								{editDetails
									?<Button
										fullWidth
										color={"secondary"}
										variant={"outlined"}
										onClick={() => {setEditDetails(false)}}
									> Cancel </Button>
									:""
								}
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
			</PageTemplate>
		</Grid>
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
	await apiFetchUser(cookie).then(res => res.json()).then(user => {
		store.dispatch(fetchUser(user));
	});
}

export default connect(state => ({user: state.user}))(Account);