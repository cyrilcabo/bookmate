import React from 'react';

import PageTemplate from '../components/PageTemplate/pagetemplate';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import fetch from 'isomorphic-unfetch';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Router from 'next/router';

import {apiValidateUsername, apiRegister} from '../utils/api';

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

const Register = (props) => {
	const classes = useStyle();
	const [fieldState, setFieldState] = React.useState({username: {error: false, msg: ''}, password: {error: false, msg: ''}, confirmpassword: {error: false, msg: ''}});
	const [user, setUser] = React.useState({username: '', password: '', confirmpassword: ''});
	const [message, setMessage] = React.useState("");
	
	const handleUser = (e) => {
		setUser({
			...user,
			[e.target.id]: e.target.value,
		});
	}
	const validate = async (e) => {
		const checkBlank = (id) => {
			setFieldState({
				...fieldState,
				[id]: (!user[id]) 
						?{error: true, msg: 'Please fill out this field!'} 
						:(user[id].length < 6) 
							?{error: true, msg: 'Minimum of 6 characters required.'} 
							:{error: false, msg: ''},
			});
			if (!user[id] || user[id].length < 6) return true;
		}
		const checkPassword = () => {			
			if (user.confirmpassword) {	
				const pState = (user.password === user.confirmpassword) ?  {error: false, msg: ''}: {error: true, msg: "Passwords don't match."};
				setFieldState({ 
					...fieldState,
					confirmpassword: pState,
					password: pState,
				});
			}
		}
		switch (e.target.id) {
			case 'username':
				if (checkBlank('username')) return;
				const response = await apiValidateUsername(user.username);
				setFieldState({
					...fieldState,
					username: (response.status==="ok") ?fieldState['username'].error ?fieldState['username'] :{error: false, msg: ''} :{error: true, msg: 'Username already exists'},
				});
				break;
			case 'password':
				if (checkBlank('password')) return;
				checkPassword();
				break;
			case 'confirmpassword':
				if (checkBlank('confirmpassword')) return;
				checkPassword();
				break;
			default: return false;
		}
	}

	const register = async () => {
		setMessage("");
		let validObj = {}, invalid = false;
		for (let valid in user) {
			validObj = {
				...validObj,
				[valid]: (!user[valid]) ?{error: true, msg: 'You cannot leave this blank!'} :fieldState[valid],
			}
			if (!user[valid] || fieldState[valid].error) invalid = true;
		}
		if (invalid) {
			setMessage("Please fill the fields right.");
			setFieldState({
				...fieldState,
				...validObj,
			});
		} else {
			const response = await apiRegister(user).then(data => data.json());
			if (response.status==="ok") Router.replace('/login?register=success');
			else setMessage(response.message);
		}
	}
	return (
		<Grid item xs={12} container justify="center">
			<PageTemplate title={"Register"}>
				<Grid item container justify="center" alignItems="center" direction="column" xs={12}>
					<Grid item container justify="center">
						<h1 style={{margin: 0, marginBottom: 20}}> JOIN US </h1>
					</Grid>
					<Grid className={classes.formContainer} container justify="center" alignItems="center" direction="column" spacing={2}>
						{message
							?<p style={{margin: 0, color: 'red'}}> {message} Try again. </p>
							:""
						}
						<Grid item container>
							<form onSubmit={async (e) => {e.preventDefault(); await register()}}>
								<TextField 
									fullWidth 
									variant="filled" 
									label={(fieldState['username'].error) ?fieldState['username'].msg :'Username'}
									id="username"
									onChange={handleUser}
									onBlur={validate}
									value={user.username}
									className={classes.inputField}
									error={fieldState['username'].error}
								/>
								<TextField 
									fullWidth 
									variant="filled" 
									label={(fieldState['password'].error) ?fieldState['password'].msg :'Password'}
									id="password"
									onChange={handleUser}
									onBlur={validate}
									value={user.password}
									type="password"
									className={classes.inputField}
									error={fieldState['password'].error}
								/>
								<TextField 
									fullWidth 
									variant="filled" 
									label={(fieldState['confirmpassword'].error) ?fieldState['confirmpassword'].msg :'Confirm password'}
									id="confirmpassword"
									onChange={handleUser}
									onBlur={validate}
									value={user.confirmpassword}
									type="password"
									className={classes.inputField} 
									error={fieldState['confirmpassword'].error}
								/>
								<input style={{display: 'none'}} type="submit" />
							</form>
						</Grid>
						<Grid item container>
							<Button fullWidth variant="contained" color="primary" onClick={register}> Register </Button>
						</Grid>
						<Grid item justify="center" container>
							<Button fullWidth variant="contained" color="secondary" onClick={() => Router.push('/login')}> Login </Button>
							Already registered?
						</Grid>
					</Grid>
				</Grid>
			</PageTemplate>
		</Grid>
	);
}

Register.getInitialProps = async ({isLogged, req, res}) => {
	if (isLogged) {
		if (req) {
			res.writeHead(301, {Location: '/'})
			res.end();
		} else {
			Router.replace('/');
		}
	}
}

export default Register;