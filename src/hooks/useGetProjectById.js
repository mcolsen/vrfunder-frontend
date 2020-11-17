import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import authAxios from "../modules/authAxios";

//	Gets project by ID and returns request state
export default function useGetProjectById(id) {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const loginStatus = useSelector((state) => state.user.loginStatus);
	const token = useSelector((state) => state.user.token);

	const get = useCallback(() => {
		setStatus("pending");
		const api = authAxios(token);
		return api
			.get(`projects/${id}`)
			.then((res) => {
				setStatus("success");
				setData(res.data);
			})
			.catch((err) => {
				setStatus("error");
				setError(err);
			});
	}, [id, token]);

	useEffect(() => {
		if (loginStatus && token && status === "idle") {
			get();
		}
	}, [get, loginStatus, token, status]);

	return { status, data, error };
}
