import AddNoteButton from "../AddNoteButton/AddNoteButton";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import "./Home.css";

export default function Home({
	notes,
	handleAddNote,
	activeNoteId,
	setActiveNoteId,
	isLoading,
}) {
	return (
		<>
			<div className="side-bar">
				<div className="app-name">
					<h1>My Notes App</h1>
				</div>
				<div className="add-note-container">
					<div className="loader-container">{isLoading && <Loader />}</div>
					<div className="add-note-button">
						<AddNoteButton handleAddNote={handleAddNote} />
					</div>
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
