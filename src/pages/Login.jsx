import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsername, setToken, setLoginStatus } from "../state/userSlice";
import { useHistory } from "react-router-dom";

function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const [loginError, setLoginError] = useState(false);

	function validateForm() {
		return form.username.length > 0 && form.password.length > 0;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	function handleSubmit(evt) {
		evt.preventDefault();
		axios
			.post("https://lamba-test.herokuapp.com/api/auth/login", {
				username: form.username,
				password: form.password,
			})
			.then((res) => {
				dispatch(setToken(res.data.token));
				dispatch(setUsername(form.username));
				dispatch(setLoginStatus(true));
				history.push("/");
			})
			.catch((err) => {
				console.error(err);
				setLoginError(true);
			});
	}

	return (
		<Container>
			Login
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						type="username"
						name="username"
						value={form.username}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
					/>
				</Form.Group>

				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Login
				</Button>
			</Form>
			{loginError
				? "Error: Please verify your credentials are correct or try again later."
				: ""}
		</Container>
	);
}

export default Login;
