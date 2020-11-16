import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormGroup } from "react-bootstrap";
import React, {useState} from 'react';

function Login() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function validateForm(){
		return username.length > 0 && password.length > 0;
	}

	function handleSubmit(evt){
		evt.preventDefault();
	}


	// //this should be for register form 
	// const postNewUser = (newUser) => {
	// 	axios
	// 	.post('https://reqres.in/api/users',newUser)
	// 	.then((res)=>{
	// 	  setUsers([res.data,...users]);
	// 	  setFormValues(initialFormValues);
	// 	})
	// 	.catch((err)=>{
	// 	  console.log(err);
	// 	  debugger;
	// 	})
	
	//   }
	  // 
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
