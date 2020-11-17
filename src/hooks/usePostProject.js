import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import authAxios from "../modules/authAxios";

//	Posts new project and returns request state
export default function usePostProject(pname, description) {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const loginStatus = useSelector((state) => state.user.loginStatus);
	const token = useSelector((state) => state.user.token);

	const post = useCallback(() => {
		setStatus("pending");
		const api = authAxios(token);
		api
			.post("projects", {
				pname: pname,
				description: description,
			})
			.then((res) => {
				setStatus("success");
				setData(res.data);
			})
			.catch((err) => {
				setStatus("error");
				setError(err);
			});
	}, [token, pname, description]);

	useEffect(() => {
		if (loginStatus && token && status === "idle") {
			post();
		}
	}, [post, loginStatus, token, status]);

	return { status, data, error };
}
