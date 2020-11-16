import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthRoute(props) {
	const loginStatus = useSelector((state) => state.user.loginStatus);

	return (
		<Route {...props}>
			{loginStatus ? props.children : <Redirect to="/login" />}
		</Route>
	);
}

export default AuthRoute;
