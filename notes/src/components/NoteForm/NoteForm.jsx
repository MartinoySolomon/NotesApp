import { useState, useEffect, useContext } from "react";
import "./NoteForm.css";
import SavedNotification from "../SavedNotifacation/SavedNotification";
import WindowContext from "../../contexts/WindowContext/WindowContext";
import leftArrowIcon from "../../assets/left-arrow.svg";
import { useNavigate } from "react-router";

export default function NoteForm({
	activeNoteId,
	activeNote,
	handleUpdateNote,
	isSaved,
	setIsSaved,
}) {
	const [formData, setFormData] = useState({
		title: "",
		priority: "",
		content: "",
	});
	const navigate = useNavigate();
	const isDesktop = useContext(WindowContext);

	useEffect(() => {
		if (activeNote)
			setFormData({
				title: activeNote.title,
				priority: activeNote.priority,
				content: activeNote.content,
			});
		else setFormData({ title: "", priority: "", content: "" });
	}, [activeNoteId]);

	function onInputChange(e) {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
	}
	function onBlur() {
		if (activeNote) {
			handleUpdateNote({ ...formData, id: activeNote.id });
		}
	}
	return (
		<>
			<div className="main">
				<SavedNotification
					isSaved={isSaved}
					setIsSaved={setIsSaved}
				/>
				<div className={`note-form ${!activeNote && "disabled"}`}>
					{!isDesktop && (
						<div className="app-name">
							<img
								src={leftArrowIcon}
								className="left-arrow-icon"
								onClick={() => navigate("/")}
							/>
							<h1>My Notes App</h1>
						</div>
					)}

					<div className="note-title">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							id="title"
							name="title"
							placeholder="Your title here"
							value={formData.title}
							onChange={onInputChange}
							onBlur={onBlur}
						/>
					</div>
					<div className="note-priority">
						<label htmlFor="priority">Priority</label>
						<select
							id="priority"
							name="priority"
							value={formData.priority}
							onBlur={onBlur}
							onChange={onInputChange}
							>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</select>
					</div>
					<div className="note-content">
						<label htmlFor="content">Note</label>

						<textarea
							id="content"
							name="content"
							placeholder="Your content here"
							value={formData.content}
							onChange={onInputChange}
							onBlur={onBlur}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
