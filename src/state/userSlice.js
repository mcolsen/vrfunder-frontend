import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		username: "",
		token: "",
		role: "",
		loginStatus: false,
		projects: [],
	},
	reducers: {
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
		setLoginStatus: (state, action) => {
			state.loginStatus = action.payload;
		},
		setUserRole: (state, action) => {
			state.role = action.payload;
		},
		setUserProjects: (state, action) => {
			state.projects = action.payload;
		},
	},
});

export const {
	setUsername,
	setToken,
	setLoginStatus,
	setUserRole,
	setUseProjects,
} = userSlice.actions;
