import AddNoteButton from "../AddNoteButton/AddNoteButton";
import NoteList from "../NoteList/NoteList";

export default function Home(
	handleAddNote,
	notes,
	activeNoteId,
	setActiveNoteId
) {
	return (
		<>
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
		</>
	);
}
