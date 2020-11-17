import axios from "axios";

export default function authAxios(token) {
	return axios.create({
		baseURL: "https://lamba-test.herokuapp.com/api/",
		headers: {
			Authorization: token,
		},
	});
}
