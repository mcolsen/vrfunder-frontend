import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import CardColumns from "react-bootstrap/CardColumns";
import ProjectCard from "../components/ProjectCard";

function Home() {
	const projects = useSelector((state) => state.projects.list);

	return (
		<Container>
			<h2 className="my-4">Explore Projects</h2>
			<CardColumns>
				{projects.map((project) => (
					<ProjectCard {...project} />
				))}
			</CardColumns>
		</Container>
	);
}

export default Home;
