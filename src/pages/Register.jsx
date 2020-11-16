import Container from "react-bootstrap/Container";
import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import {useHistory} from 'react-router-dom';
import {DropdownButton, Dropdown} from 'react-bootstrap'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios';




function Register(props) {
	const {values, submit, change, disabled, errors} = props;

	const [username, setUsername] = useState('');
	const[password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [user, setUser] = useState({});
	const history = useHistory();
	
	
	function validateForm(){
		return username.length > 0 && password.length > 0 ;
	}
	function handleSubmit(evt){
		evt.preventDefault();
		const newUser = {
			username:username,
			password:password,
			role:role
		}

		postNewUser(newUser);
		console.log(newUser);
	}

	const postNewUser = (newUser) => {
		axios
		.post('https://lamba-test.herokuapp.com/api/auth/register',newUser)
		.then((res)=>{
		  setUser([newUser]);
		  history.push("/login")
		})
		.catch((err)=>{
		  console.log(err);
		  debugger;
		})
	
	  }


	return <Container>
		Register
		<Form onSubmit={handleSubmit}>
				<Form.Group size='sm' controlId='username'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						type='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>

				<Form.Group size='sm' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size='sm' controlId='role'>
					<Form.Label>Role</Form.Label>
						<DropdownButton id="dropdown-basic-button" title="Dropdown button" onSelect={function(evt){setRole(evt)}}>
  							<Dropdown.Item eventKey='1'>Fundraiser</Dropdown.Item>
  							<Dropdown.Item eventKey="2">Funder</Dropdown.Item>
  
						</DropdownButton>
						<h4>You selected {role}</h4>
					
				</Form.Group>

				<Button block size='lg' type='submit' disabled={!validateForm()}>
					Register
				</Button>
			</Form>
		</Container>;
}

export default Register;
