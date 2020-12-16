//	React
import { useState, useEffect } from "react";
import { usePostProject } from "../hooks";
//	Bootstrap components
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//	Other
import * as yup from "yup";

const schema = yup.object().shape({
	pname: yup.string().required().min(1),
	description: yup.string(),
	location: yup.string(),
	goal: yup.number().integer().positive().required(),
	image_url: yup.string().url(),
	external_url: yup.string().url(),
});

function NewProject() {
	const [form, setForm] = useState({
		pname: "",
		description: "",
		location: "",
		goal: "",
		image_url: "",
		external_url: "",
	});
	const [formValid, setFormValid] = useState(false);

	const postProject = usePostProject(form);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postProject();
	};

	const validate = () => {
		schema.isValid(form).then((valid) => {
			setFormValid(valid);
		});
	};
	useEffect(validate, [form]);

	return (
		<Container>
			<h1>Create new project</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.Label>Project name</Form.Label>
					<Form.Control
						autoFocus
						name="pname"
						placeholder="Required"
						value={form.pname}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="goal">
					<Form.Label>Funding goal (USD)</Form.Label>
					<Form.Control
						name="goal"
						placeholder="Required"
						type="number"
						min="0"
						value={form.goal}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						name="description"
						placeholder="Optional"
						value={form.description}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="location">
					<Form.Label>Location</Form.Label>
					<Form.Control
						name="location"
						placeholder="Optional"
						value={form.location}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="image_url">
					<Form.Label>Image (external URL)</Form.Label>
					<Form.Control
						name="image_url"
						placeholder="Optional"
						value={form.image_url}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="external_url">
					<Form.Label>Website</Form.Label>
					<Form.Control
						name="external_url"
						placeholder="Optional"
						value={form.external_url}
						onChange={handleChange}
					/>
				</Form.Group>

				<Button type="submit" disabled={!formValid}>
					Submit
				</Button>
			</Form>
		</Container>
	);
}

export default NewProject;
