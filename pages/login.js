import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import makeStyles from '@material-ui/core/styles/makeStyles';

import PageTemplate from '../components/PageTemplate/pagetemplate';

import Router from 'next/router';

import {apiLogin} from '../utils/api';

const useStyle = makeStyles(theme => ({
	inputField: {
		"& div.MuiInputBase-root": {
			backgroundColor: 'white',
		}
	},
	formContainer: {
		width: '60%',
		[theme.breakpoints.down('sm')]: {
			width: '95%',
		}
	}
}));

const Login = (props) => {
	const classes = useStyle();
	const [loginMessage, setMessage] = React.useState('');
	const [user, setUser] = React.useState({username: '', password: ''});
	const message = props.message;
	const handleUser = (e) => setUser({...user, [e.target.id]: e.target.value});
	const login = async () => {
		setMessage("");
		await apiLogin(user).then(async data => {
			if (data.status === 401) { 
				setMessage('Invalid credentials!');
			} else if (data.status === 200) {
				Router.replace('/');
			} else {
				setMessage('Something went wrong. Please try again.')
			}

		});
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login();
	}
	return (	
		<Grid item xs={12} container justify="center">	
			<PageTemplate title={"Login"}>
				<Grid item xs={12} container direction="column" justify="center" alignItems="center">
					<Grid item container justify="center" alignItems="flex-end">
						<h1 style={{margin: 0, marginBottom: 20}}> BookMate </h1>
					</Grid>
					<Grid item className={classes.formContainer} container justify="center" direction="column" spacing={1}>
						<Grid item container justify="center">
							<Typography component="p" style={{textAlign: 'center', color: message.register==='success' ?'green' :'maroon'}}> 
								{(message.register == 'success' && !loginMessage) 
									?"You have successfully registered! Please login." 
									:loginMessage
								} 
							</Typography>
						</Grid>
						<Grid item>
							<form id="loginform" onSubmit={handleSubmit.bind(this)}>
								<TextField fullWidth variant="filled" id="username" value={user.username} onChange={handleUser} label="Username" className={classes.inputField}/>
								<TextField onSubmit={(e) => {e.preventDefault(); console.log('hi');}} fullWidth variant="filled" id="password" value={user.password} onChange={handleUser} label="Password" className={classes.inputField} type="password"/>
								<input type="submit" style={{display: 'none'}}/>
							</form>
						</Grid>
						<Grid item>
							<Button fullWidth color="primary" variant="contained" onClick={login}> Login </Button>
							<Button fullWidth color="secondary" variant="contained" onClick={() => Router.push('/register')}> Register </Button>
						</Grid>
						<Grid item container justify="center">
							<p color="textSecondary"> Don't have an account? Create one! </p>
						</Grid>
					</Grid>
				</Grid>
			</PageTemplate>
		</Grid>
	);
}

Login.getInitialProps = ({isLogged, req, res, query}) => {
	if (isLogged) {
		if (req) {
			res.writeHead(301, {Location: '/'})
			res.end();
		} else {
			Router.replace('/');
		}
	}
	return {message: query};
}

export default Login;