import { useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function useAuthAxios() {
	const token = useSelector((state) => state.user.token);

	const serverUrl = useSelector((state) => state.api.serverUrl);

	const create = useCallback(() => {
		return axios.create({
			baseURL: serverUrl,
			headers: {
				Authorization: token,
			},
		});
	}, [token, serverUrl]);
	return create();
}
