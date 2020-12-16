import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useLogin from "./useLogin";
import {
	registerIdle,
	registerPending,
	registerSuccess,
	registerError,
	registerReset,
} from "../store";

export default function useRegister(form) {
	const dispatch = useDispatch();
	const login = useLogin(form);

	const serverUrl = useSelector((state) => state.api.serverUrl);

	useEffect(() => {
		dispatch(registerIdle());
		return () => {
			dispatch(registerReset());
		};
	}, [dispatch]);

	const register = useCallback(() => {
		dispatch(registerPending());
		axios
			.post(serverUrl + "auth/register", {
				username: form.username,
				password: form.password,
				role: form.role,
			})
			.then((res) => {
				dispatch(registerSuccess(res.data));
				login();
			})
			.catch((err) => {
				dispatch(registerError(err.message));
			});
	}, [dispatch, form, login, serverUrl]);
	return register;
}
