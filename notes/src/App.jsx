import "./App.css";
import AddNoteButton from "./components/AddNoteButton/AddNoteButton";
import NoteForm from "./components/NoteForm/NoteForm";
import NoteList from "./components/NoteList/NoteList";

function App() {
	return (
		<>
			<div className="wrapper">
				<div className="side-bar">
					<div className="app-name">
						<h1>My Notes App</h1>
					</div>
					<div className="add-note-button">
						<AddNoteButton />
					</div>
					<div className="note-list">
						<NoteList />
					</div>
				</div>
				<div className="main">
					<NoteForm />
				</div>
			</div>
		</>
	);
}

export default App;
