import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";


import NoteForm from "./components/NoteForm/NoteForm";
import Home from "./components/Home/Home";

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
	}, [notes]);

	return (
		<>
				<Home
					notes={notes}
					handleAddNote={handleAddNote}
					activeNoteId={activeNoteId}
					setActiveNoteId={setActiveNoteId}
				/>
				<NoteForm
					activeNoteId={activeNoteId}
					activeNote={getActiveNote()}
					handleUpdateNote={handleUpdateNote}
					isSaved={isSaved}
					setIsSaved={setIsSaved}
				/>
		</>
	);
}

export default App;
