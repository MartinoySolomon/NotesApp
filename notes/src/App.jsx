import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

import { db } from "./firebase-config";
import {
	collection,
	getDocs,
	doc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

import NoteForm from "./components/NoteForm/NoteForm";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import WindowContext from "./contexts/WindowContext/WindowContext";

function App() {
	const [notes, setNotes] = useState([]);
	const [activeNoteId, setActiveNoteId] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const isDesktop = useContext(WindowContext);

	const getActiveNote = () => {
		return notes.find((note) => note.id === activeNoteId);
	};

	useEffect(() => {
		const loadNotes = async () => {
			try {
				setIsLoading(true);
				const notesArray = await fetchNotesFromFirebsae();
				setNotes(notesArray);
			} catch (error) {
				console.error("Error loading notes:", error);
				return;
			} finally {
				setIsLoading(false);
			}
		};
		loadNotes();
	}, []);

	async function fetchNotesFromFirebsae() {
		try {
			const notesCollectionRef = collection(db, "notes");
			const notesSnapshot = await getDocs(notesCollectionRef);
			const notesList = notesSnapshot.docs.map((doc) => {
				const noteData = doc.data();
				const noteId = doc.id;
				return {
					...noteData,
					id: noteId,
				};
			});
			return notesList;
		} catch (error) {
			console.error("Error fetching notes", error);
			return [];
		}
	}

	async function handleAddNote() {
		const newNoteId = uuid();
		const newNoteData = {
			title: "",
			content: "",
			priority: "Low",
		};
		try {
			setIsLoading(true);
			const newNoteRef = doc(db, "notes", newNoteId);
			await setDoc(newNoteRef, newNoteData);
			const updatedNotes = await fetchNotesFromFirebsae();
			setNotes(updatedNotes);
		} catch (error) {
			console.error("Error adding note:", error);
			return;
		} finally {
			setIsLoading(false);
		}
	}

	async function handleUpdateNote(updatedNote) {
		const noteDocRef = doc(db, "notes", updatedNote.id);
		const dataToUpdate = {
			title: updatedNote.title,
			content: updatedNote.content,
			priority: updatedNote.priority,
		};
		try {
			await updateDoc(noteDocRef, dataToUpdate);
			const updateNotesArray = await fetchNotesFromFirebsae();
			setNotes(updateNotesArray);
			setIsSaved(true);
		} catch (error) {
			console.error("Error updating note:", error);
			return;
		}
	}

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
							isLoading={isLoading}
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
										isLoading={isLoading}
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
