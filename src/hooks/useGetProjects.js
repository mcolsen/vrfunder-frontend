import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import authAxios from "../modules/authAxios";
import { setProjectList } from "../state/projectsSlice";

//	Gets all projects on auth and dispatches to store
export default function useGetProjects() {
	const dispatch = useDispatch();
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);

	const loginStatus = useSelector((state) => state.user.loginStatus);
	const token = useSelector((state) => state.user.token);

	const get = useCallback(() => {
		setStatus("pending");
		const api = authAxios(token);
		return api
			.get("projects")
			.then((res) => {
				setStatus("success");
				dispatch(setProjectList(res.data));
			})
			.catch((err) => {
				setStatus("error");
				setError(err);
			});
	}, [token, dispatch]);

	useEffect(() => {
		if (loginStatus && token && status === "idle") {
			get();
		}
	}, [get, loginStatus, token, status]);

	return { status, error };
}
