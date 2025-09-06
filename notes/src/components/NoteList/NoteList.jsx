import "./NoteList.css";
import NoteItem from "../NoteItem/NoteItem";


export default function NoteList({ notes, activeNoteId, setActiveNoteId }) {

	const highPriorityNotes = notes.filter((note) => note.priority === "High");
	const mediumPriorityNotes = notes.filter(
		(note) => note.priority === "Medium"
	);
	const lowPriorityNotes = notes.filter((note) => note.priority === "Low");

	return (
		<>

			{highPriorityNotes.length > 0 && (
				<>
					<h2>High Priority</h2>
					<div className="note-list-priority">
						{highPriorityNotes.map((note) => {
							return (
								<NoteItem
									key={note.id}
									note={note}
									activeNoteId={activeNoteId}
									setActiveNoteId={setActiveNoteId}
								/>
							);
						})}
					</div>
				</>
			)}
			{mediumPriorityNotes.length > 0 && (
				<>
					<h2>Medium Priority</h2>
					<div className="note-list-priority">
						{mediumPriorityNotes.map((note) => {
							return (
								<NoteItem
									key={note.id}
									note={note}
									activeNoteId={activeNoteId}
									setActiveNoteId={setActiveNoteId}
								/>
							);
						})}
					</div>
				</>
			)}
			{lowPriorityNotes.length > 0 && (
				<>
					<h2>Low Priority</h2>
					<div className="note-list-priority">
						{lowPriorityNotes.map((note) => {
							return (
								<NoteItem
									key={note.id}
									note={note}
									activeNoteId={activeNoteId}
									setActiveNoteId={setActiveNoteId}
								/>
							);
						})}
					</div>
				</>
			)}
		</>
	);
}
