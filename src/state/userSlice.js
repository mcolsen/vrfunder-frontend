import { createSlice } from "@reduxjs/toolkit";

const initUserState = {
	username: "",
	token: "",
	role: "",
	loginStatus: false,
	projects: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState: { ...initUserState },
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
		logoutUser: (state, action) => {
			//	Setting the state to initUserState (with and without spread operator) does not work
			//	Unclear why that's the case, but this workaround is in place for now
			state.username = initUserState.username;
			state.token = initUserState.token;
			state.loginStatus = initUserState.loginStatus;
		},
	},
});

export const {
	setUsername,
	setToken,
	setLoginStatus,
	setUserRole,
	setUseProjects,
	logoutUser,
} = userSlice.actions;
