import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { setUsername, setToken, setLoginStatus } from "../state/userSlice";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

function Register() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [form, setForm] = useState({
		username: "",
		password: "",
		role: 2,
	});
	const [registerError, setRegisterError] = useState(false);

	const postNewUser = (username, password, role) => {
		//	Role MUST be an integer, 1 for fundraiser and 2 for fundraiser
		axios
			.post("https://lamba-test.herokuapp.com/api/auth/register", {
				username: username,
				password: password,
				role: role,
			})
			.then((res) => {
				//	Login new user on registration success
				axios
					.post("https://lamba-test.herokuapp.com/api/auth/login", {
						username: username,
						password: password,
					})
					.then((res) => {
						dispatch(setToken(res.data.token));
						dispatch(setUsername(username));
						dispatch(setLoginStatus(true));
						history.push("/");
					})
					.catch((err) => {
						console.error(err);
						setRegisterError(true);
					});
			})
			.catch((err) => {
				console.error(err);
				setRegisterError(true);
			});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postNewUser(form.username, form.password, form.role);
	};

	const handleSelect = (eventKey) => {
		setForm({ ...form, role: eventKey });
	};

	function validateForm() {
		return form.username.length > 0 && form.password.length > 0;
	}

	return (
		<Container>
			Register
			<Form onSubmit={handleSubmit}>
				<Form.Group size="sm" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						name="username"
						type="username"
						value={form.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group size="sm" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group size="sm" controlId="role">
					<Form.Label>Role</Form.Label>
					<DropdownButton
						id="dropdown-basic-button"
						title="Dropdown button"
						name="role"
						onSelect={handleSelect}
						value={form.role}
					>
						<Dropdown.Item eventKey="1">Fundraiser</Dropdown.Item>
						<Dropdown.Item eventKey="2">Funder</Dropdown.Item>
					</DropdownButton>
					<h4>You selected {form.role}</h4>
				</Form.Group>

				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Register
				</Button>
				{registerError ? "Error: Please try again later" : ""}
			</Form>
		</Container>
	);
}

export default Register;
