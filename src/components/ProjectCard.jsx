import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

function ProjectCard(props) {
	const {
		pname,
		description,
		location,
		goal,
		progress,
		image_url,
		fundraiser,
		id,
	} = props;

	const percent = progress ? (progress / goal) * 100 : 0;

	return (
		<Card>
			{image_url ? <Card.Img variant="top" src={image_url} /> : ""}
			<Card.Body>
				<Card.Title>{pname}</Card.Title>
				<Card.Subtitle>{fundraiser}</Card.Subtitle>
				<Card.Text>
					<Link to={`/project/${id}`}>Learn More</Link>
				</Card.Text>
				<Card.Text>{description}</Card.Text>
				<ProgressBar now={percent} />
			</Card.Body>
			{location ? <Card.Footer>{location}</Card.Footer> : ""}
		</Card>
	);
}

export default ProjectCard;
