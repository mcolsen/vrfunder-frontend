import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
	loginUser,
	loginIdle,
	loginPending,
	loginSuccess,
	loginError,
	loginReset,
} from "../store";

export default function useLogin(form) {
	const dispatch = useDispatch();

	const serverUrl = useSelector((state) => state.api.serverUrl);

	useEffect(() => {
		dispatch(loginIdle());
		return () => {
			dispatch(loginReset());
		};
	}, [dispatch]);

	const login = useCallback(() => {
		dispatch(loginPending());
		axios
			.post(serverUrl + "auth/login", {
				username: form.username,
				password: form.password,
			})
			.then((res) => {
				dispatch(loginSuccess(res.data));
				dispatch(loginUser(res.data));
			})
			.catch((err) => {
				dispatch(loginError(err.message));
			});
	}, [dispatch, form, serverUrl]);
	return login;
}
