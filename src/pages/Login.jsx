import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormGroup } from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import axios from 'axios';


function Login() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState({});


	function validateForm(){
		return username.length > 0 && password.length > 0;
	}

	function handleSubmit(evt){
		evt.preventDefault();
		const User = {
			username:username,
			password:password
			
		}
		postUser(User);
		
	}
	

	const postUser = (User) => {
		axios
		.post('https://lamba-test.herokuapp.com/api/auth/login',User)
		.then((res)=>{
		  setUser([User]);
		console.log(User);
		})
		.catch((err)=>{
		  console.log(err);
		  debugger;
		})
	
	  }
	
	
	return <Container>
		Login
			<Form onSubmit={handleSubmit}>
				<Form.Group size='lg' controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						type='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size='lg' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
			

				<Button block size='lg' type='submit' disabled={!validateForm()}>
					Login
				</Button>
			</Form>
		</Container>;
}

export default Login;
