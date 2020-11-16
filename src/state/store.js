import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { projectsSlice } from "./projectsSlice";

const store = configureStore({
	reducer: { user: userSlice.reducer, projects: projectsSlice.reducer },
});

export default store;
