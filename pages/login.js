import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import makeStyles from '@material-ui/core/styles/makeStyles';

import MainBody from '../components/mainbody';

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

const Login = (props) => {
	const classes = useStyle();
	const [loginMessage, setMessage] = React.useState('');
	const [user, setUser] = React.useState({username: '', password: ''});
	const message = props.message;
	const handleUser = (e) => setUser({...user, [e.target.id]: e.target.value});
	const login = async () => {
		const response = await fetch('https://bookmate.herokuapp.com/api/authentication/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'content-type': 'application/json',
			}
		}).then(data => data.json()).then(data => {
			if (data.status === 401)
				setMessage('Invalid credentials!');
			else	
				Router.replace('/');
		});
	}
	return (		
		<MainBody className={classes.root}>
			<Grid item container justify="center" alignItems="flex-end">
				<h1 style={{color: 'white'}}> Login </h1>
			</Grid>
			<Grid item className={classes.formContainer} container justify="center" direction="column" spacing={1}>
				<Grid item container justify="center">
					<Typography color="green" component="p" style={{textAlign: 'center'}}> {(message.register == 'success' && !loginMessage) ?"You have successfully registered! Please login." :loginMessage} </Typography>
				</Grid>
				<Grid item>
					<TextField fullWidth variant="filled" id="username" value={user.username} onChange={handleUser} label="Username" className={classes.inputField}/>
					<TextField fullWidth variant="filled" id="password" value={user.password} onChange={handleUser} label="Password" className={classes.inputField} type="password"/>
				</Grid>
				<Grid item>
					<Button fullWidth color="primary" variant="contained" onClick={login}> Login </Button>
					<Button fullWidth color="secondary" variant="contained" onClick={() => Router.push('/register')}> Register </Button>
				</Grid>
				<Grid item container justify="center">
					<p color="textSecondary"> Don't have an account? Create one! </p>
				</Grid>
			</Grid>
		</MainBody>
	);
}

Login.getInitialProps = async ({isLogged, req, res, query}) => {
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