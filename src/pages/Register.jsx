import Container from "react-bootstrap/Container";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { setUsername, setToken, setLoginStatus } from "../state/userSlice";

function Register() {
	const dispatch = useDispatch();
	const history = useHistory();
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
				console.log(res);
				axios
					.post("https://lamba-test.herokuapp.com/api/auth/login", {
						username: username,
						password: password,
					})
					.then((res) => {
						console.log(res);
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

	return (
		<Container>
			Register
			{registerError ? "Error: Please try again later." : ""}
		</Container>
	);
}

export default Register;
