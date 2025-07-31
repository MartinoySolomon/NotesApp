import { useState } from "react";
import "./NoteForm.css";
import { useEffect } from "react";
import SavedNotification from "../SavedNotifacation/SavedNotification";

export default function NoteForm({
	activeNoteId,
	activeNote,
	handleUpdateNote,
	isSaved,
	setIsSaved,
}) {
	const [formData, setFormData] = useState({ title: "", content: "" });

	useEffect(() => {
		if (activeNote)
			setFormData({ title: activeNote.title, content: activeNote.content });
		else setFormData({ title: "", content: "" });
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
				<div className={"note-form"}>
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
							disabled={!activeNote}
						/>
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
							disabled={!activeNote}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
