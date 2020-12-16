//	React
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRegister } from "../hooks";
//	Redux
import { useSelector } from "react-redux";
import { API_STATUS } from "../store";
//	Bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import registerSchema from "../validation/registerSchema";
//	Other
import * as yup from "yup";

function Register() {
	const [form, setForm] = useState({
		username: "",
		password: "",
		role: 2,
	});
	const [errors, setErrors] = useState();

	const validateChange = (e) => {
		yup
			.reach(registerSchema, e.target.name)
			.validate(e.target.name)
			.then((valid) => {
				setErrors({
					...errors,
					[e.target.name]: "",
				});
			})
			.catch((err) => {
				setErrors({
					...errors,
					[e.target.name]: err.errors[0],
				});
			});
	};

	const history = useHistory();
	const register = useRegister(form);
	const status = useSelector((state) => state.api.register.status);

	function validateForm() {
		return form.username.length > 0 && form.password.length > 0;
	}

	const handleChange = (e) => {
		e.persist();
		const newForm = {
			...form,
			[e.target.name]: e.target.value,
		};
		validateChange(e);
		setForm(newForm);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		register();
	};

	useEffect(() => {
		if (status === API_STATUS.SUCCESS) {
			history.push("/");
		}
	}, [status, history]);

	return (
		<Container>
			<h2 className="my-4">Register</h2>
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
					<Form.Control
						as="select"
						name="role"
						value={form.role}
						onChange={handleChange}
					>
						<option value={2}>Funder</option>
						<option value={1}>Fundraiser</option>
					</Form.Control>
				</Form.Group>
				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Register
				</Button>
				{status === API_STATUS.ERROR ? "Error: Please try again later" : ""}
			</Form>
		</Container>
	);
}

export default Register;
