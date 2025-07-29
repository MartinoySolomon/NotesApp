import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import AddNoteButton from "./components/AddNoteButton/AddNoteButton";
import NoteForm from "./components/NoteForm/NoteForm";
import NoteList from "./components/NoteList/NoteList";

function App() {
	const [notes, setNotes] = useState(() => fetchNotesFromStorage());
	const [activeNoteId, setActiveNoteId] = useState(null);
	const [isSaved, setIsSaved] = useState(false);

	function fetchNotesFromStorage() {
		const storedNotes = localStorage.getItem("notes");
		if (storedNotes) {
			return JSON.parse(storedNotes);
		} else return [];
	}

	function saveNotesToStorage() {
		localStorage.setItem("notes", JSON.stringify(notes));
	}

	function handleAddNote() {
		const newNote = {
			id: uuid(),
			title: "",
			content: "",
		};
		setNotes((prev) => [...prev, newNote]);
		setActiveNoteId(newNote.id);
	}

	const getActiveNote = () => {
		return notes.find((note) => note.id === activeNoteId);
	};

	function handleUpdateNote(updatedNote) {
		const updateNotesArray = notes.map((note) => {
			if (note.id === updatedNote.id) return updatedNote;
			return note;
		});
		setNotes(updateNotesArray);
		setIsSaved(true);
	}
	useEffect(() => {
		saveNotesToStorage();
		console.log(notes);
	}, [notes]);

	return (
		<>
			<div className="wrapper">
				<div className="side-bar">
					<div className="app-name">
						<h1>My Notes App</h1>
					</div>
					<div className="add-note-button">
						<AddNoteButton handleAddNote={handleAddNote} />
					</div>
					<div className="note-list">
						<NoteList
							notes={notes}
							activeNoteId={activeNoteId}
							setActiveNoteId={setActiveNoteId}
						/>
					</div>
				</div>
				<div className="main">
					<NoteForm
						activeNoteId={activeNoteId}
						activeNote={getActiveNote()}
						handleUpdateNote={handleUpdateNote}
						isSaved={isSaved}
						setIsSaved={setIsSaved}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
