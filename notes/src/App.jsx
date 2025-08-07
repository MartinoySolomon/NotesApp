import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

import NoteForm from "./components/NoteForm/NoteForm";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import WindowContext from "./contexts/WindowContext/WindowContext";

function App() {
	const [notes, setNotes] = useState(() => fetchNotesFromStorage());
	const [activeNoteId, setActiveNoteId] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const isDesktop= useContext(WindowContext);

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
			priority:"low",
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
			<BrowserRouter>
				{isDesktop ? (
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
				) : (
					<>
						<Routes>
							<Route
								path="/"
								element={
									<Home
										notes={notes}
										handleAddNote={handleAddNote}
										activeNoteId={activeNoteId}
										setActiveNoteId={setActiveNoteId}
									/>
								}
							/>
							<Route
								path="edit/:noteId"
								element={
									<NoteForm
										activeNoteId={activeNoteId}
										activeNote={getActiveNote()}
										handleUpdateNote={handleUpdateNote}
										isSaved={isSaved}
										setIsSaved={setIsSaved}
									/>
								}
							/>
						</Routes>
					</>
				)}
			</BrowserRouter>
		</>
	);
}

export default App;
