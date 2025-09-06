import { useState, useEffect, useContext } from "react";
import "./NoteForm.css";
import SavedNotification from "../SavedNotifacation/SavedNotification";
import Loader from "../Loader/Loader";
import WindowContext from "../../contexts/WindowContext/WindowContext";
import leftArrowIcon from "../../assets/left-arrow.svg";
import trashcanIcon from "../../assets/trashcan.svg";
import { useNavigate, useParams } from "react-router";
import UserDisplay from "../UserDisplay/UserDisplay";
import UserContext from "../../contexts/UserContext/UserContext";

export default function NoteForm({
	activeNoteId,
	activeNote,
	handleUpdateNote,
	isSaved,
	setIsSaved,
	setActiveNoteId,
	handleDeleteNote,
	isLoading,
	notes,
}) {
	const [formData, setFormData] = useState({
		title: "",
		priority: "",
		content: "",
	});
	const navigate = useNavigate();
	const isDesktop = useContext(WindowContext);
	const params = useParams();
	const { activeUser, setActiveUser } = useContext(UserContext);

	useEffect(() => {
		if (params.noteId && !activeNoteId) {
			setActiveNoteId(params.noteId);
		}
		if (activeNote && !activeUser) {
			setActiveUser(activeNote.userId);
		}
		if (activeNote) {
			setFormData({
				title: activeNote.title,
				priority: activeNote.priority,
				content: activeNote.content,
			});
		} else setFormData({ title: "", priority: "", content: "" });
	}, [activeNoteId, activeNote, params.noteId, activeUser]);

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
				{isDesktop && <UserDisplay />}
				{!isDesktop && (
					<div className="app-name">
						<img
							src={leftArrowIcon}
							className="left-arrow-icon"
							onClick={() => navigate("/")}
						/>
						<h1>{activeNote.title || "New Note"}</h1>
					</div>
				)}
				<div className={`note-form ${!activeNote && "disabled"}`}>
					<SavedNotification
						isSaved={isSaved}
						setIsSaved={setIsSaved}
					/>

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
							onChange={onInputChange}>
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
					<div className="note-delete-button">
						<img
							src={trashcanIcon}
							onClick={async () => {
								await handleDeleteNote(activeNoteId);
								if (params.noteId) navigate("/");
							}}
							alt="Delete"
						/>
						{isLoading && !isDesktop && (
							<>
								<div>
									<Loader />
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
