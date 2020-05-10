import React from 'react';

import MainBody from '../components/mainbody';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import fetch from 'isomorphic-unfetch';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Router from 'next/router';

const useStyle = makeStyles(theme => ({
	root: {
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		height: '70vh',
		[theme.breakpoints.up('md')]: {
			height: 450,
		}
	},
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
				[id]: (!user[id]) ?{error: true, msg: 'Please fill out this field!'} :{error: false, msg: ''},
			});
			if (!user[id]) return false;
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
				checkBlank('username');
				const response = await fetch(`https://bookmate.herokuapp.com/api/authentication/validateusername?username=${user.username}`).then(response => response.json());
				setFieldState({
					...fieldState,
					username: (response.status==="ok") ?{error: false, msg: ''} :{error: true, msg: 'Username already exists'},
				});
				break;
			case 'password':
				checkBlank('password');
				checkPassword();
				break;
			case 'confirmpassword':
				checkBlank('confirmpassword');
				checkPassword();
				break;
			default: return false;
		}
	}
	const register = async () => {
		let validObj = {}, invalid = false;
		console.log(fieldState);
		for (let valid in user) {
			validObj = {
				...validObj,
				[valid]: (!user[valid]) ?{error: true, msg: 'You cannot leave this blank!'} :fieldState[valid],
			}
			if (!user[valid] || fieldState[valid].error) invalid = true;
		}
		if (invalid) {	
			setFieldState({
				...fieldState,
				...validObj,
			});
		} else {
			const response = await fetch('https://bookmate.herokuapp.com/api/authentication/register', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'content-type': 'application/json',
				},
			}).then(data => data.json());
			if (response.status==="ok") Router.replace('/login?register=success');
		}
	}
	return (
		<MainBody className={classes.root}>
			<Grid item container justify="center">
				<h1 style={{color: 'white'}}> Register </h1>
			</Grid>
			<Grid className={classes.formContainer} container justify="center" alignItems="center" direction="column" spacing={2}>
				<Grid item container>
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
				</Grid>
				<Grid item container>
					<Button fullWidth variant="contained" color="primary" onClick={register}> Register </Button>
				</Grid>
				<Grid item justify="center" container>
					<Button fullWidth variant="contained" color="secondary"> Login </Button>
					Already registered?
				</Grid>
			</Grid>
		</MainBody>
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