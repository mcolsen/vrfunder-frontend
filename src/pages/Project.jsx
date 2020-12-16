//	React
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//	Bootstrap components
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import Media from "react-bootstrap/Media";

function Project() {
	const { id } = useParams();

	const {
		pname,
		description,
		location,
		goal,
		progress,
		image_url,
		external_url,
		fundraiser,
	} = useSelector((state) =>
		state.projects.list.find((project) => project.id === Number(id))
	);

	const percent = progress ? (progress / goal) * 100 : 0;

	return (
		<Container>
			<h2 className="mt-4">{pname}</h2>
			<h4>
				{fundraiser} {location ? `— ${location}` : ""}
			</h4>
			{image_url ? (
				<img
					src={image_url}
					alt={pname}
					width="80%"
					style={{ margin: "0 10% 4% 10%" }}
				/>
			) : (
				""
			)}
			<ProgressBar now={percent} />
			<p align="right">
				${progress ? progress : 0} raised out of ${goal} ({percent}%)
			</p>
			{description ? description : ""}
			{external_url ? (
				<p>
					Learn more at {fundraiser}'s <a href={external_url}>website</a>
				</p>
			) : (
				""
			)}
		</Container>
	);
}

export default Project;
