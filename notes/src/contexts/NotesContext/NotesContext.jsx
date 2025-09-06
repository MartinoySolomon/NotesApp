import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase-config";
import {
	collection,
	getDocs,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
} from "firebase/firestore";
import UserContext from "../UserContext/UserContext";
import WindowContext from "../WindowContext/WindowContext";

const NotesContext = createContext();

export function NotesProvider({ children }) {
	const [notes, setNotes] = useState([]);
	const [activeNoteId, setActiveNoteId] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { activeUser } = useContext(UserContext);
	const isDesktop = useContext(WindowContext);

	const getActiveNote = () => {
		return notes.find((note) => note.id === activeNoteId);
	};

	useEffect(() => {
		const loadNotes = async () => {
			setIsLoading(true);
			try {
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
	}, [activeUser]);

	async function fetchNotesFromFirebsae() {
		try {
			if (!activeUser) return [];
			const notesCollectionRef = collection(db, "notes");
			const q = query(notesCollectionRef, where("userId", "==", activeUser.id));
			const notesSnapshot = await getDocs(q);
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
			userId: activeUser ? activeUser.id : null,
		};
		setIsLoading(true);
		try {
			const newNoteRef = doc(db, "notes", newNoteId);
			await setDoc(newNoteRef, newNoteData);
			const updatedNotes = await fetchNotesFromFirebsae();
			setNotes(updatedNotes);
			setActiveNoteId(newNoteId);
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

	async function handleDeleteNote(noteId) {
		const noteDocRef = doc(db, "notes", noteId);
		setIsLoading(true);
		try {
			await deleteDoc(noteDocRef);
			const updateNotesArray = await fetchNotesFromFirebsae();
			setNotes(updateNotesArray);
			setActiveNoteId(null);
		} catch (error) {
			console.error("Error deleting note:", error);
			return;
		} finally {
			setIsLoading(false);
		}
	}

	const value = {
		notes,
		activeNoteId,
		setActiveNoteId,
		isSaved,
		setIsSaved,
		isLoading,
		getActiveNote,
		handleAddNote,
		handleUpdateNote,
		handleDeleteNote,
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}

export default NotesContext;
