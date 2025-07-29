import "./NoteList.css";
import NoteItem from "../NoteItem/NoteItem";
import { Link } from "react-router";

export default function NoteList({
	notes,
	activeNoteId,
	setActiveNoteId,
}) {
	return (
		<>
			{notes.map((note) => {
				return (
					<NoteItem
						key={note.id}
						note={note}
						activeNoteId={activeNoteId}
						setActiveNoteId={setActiveNoteId}
					/>
				);
			})}
		</>
	);
}
