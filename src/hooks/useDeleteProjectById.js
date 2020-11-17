import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import authAxios from "../modules/authAxios";

//	Returns function that deletes an existing project by id, along with request state
export default function useDeleteProjectById(id) {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const token = useSelector((state) => state.user.token);

	const del = useCallback(() => {
		setStatus("pending");
		const api = authAxios(token);
		api
			.delete(`projects/${id}`)
			.then((res) => {
				setStatus("success");
				setData(res.data);
			})
			.catch((err) => {
				setStatus("error");
				setError(err);
			});
	}, [id, token]);

	return { del, status, data, error };
}
