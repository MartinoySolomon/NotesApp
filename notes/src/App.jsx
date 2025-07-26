import "./App.css";
import AddNoteButton from "./components/AddNoteButton/AddNoteButton";
import NoteForm from "./components/NoteForm/NoteForm";
import NoteList from "./components/NoteList/NoteList";

function App() {
	return (
		<>
			<div className="wrapper">
				<div className="side-bar">
					<h1>My Notes App</h1>
					<AddNoteButton />
					<NoteList />
				</div>
				<div className="main">
					<NoteForm />
				</div>
			</div>
		</>
	);
}

export default App;
