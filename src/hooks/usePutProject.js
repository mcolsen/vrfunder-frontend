import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAuthAxios from "./useAuthAxios";
import {
	putProjectIdle,
	putProjectPending,
	putProjectSuccess,
	putProjectError,
	putProjectReset,
} from "../store";

export default function usePutProject(id, form) {
	const dispatch = useDispatch();
	const api = useAuthAxios();

	const username = useSelector((state) => state.user.username);

	useEffect(() => {
		dispatch(putProjectIdle());
		return () => {
			dispatch(putProjectReset());
		};
	}, [dispatch]);

	const put = useCallback(() => {
		dispatch(putProjectPending());
		api
			.put(`projects/${id}`, {
				...form,
				fundraiser: username,
			})
			.then((res) => {
				dispatch(putProjectSuccess(res.data));
			})
			.catch((err) => {
				dispatch(putProjectError(err.message));
			});
	}, [dispatch, api, username, id, form]);
	return put;
}
