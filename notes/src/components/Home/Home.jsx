import AddNoteButton from "../AddNoteButton/AddNoteButton";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import "./Home.css";
import { useContext } from "react";
import WindowContext from "../../contexts/WindowContext/WindowContext";
import leftArrowIcon from "../../assets/left-arrow.svg";
import UserContext from "../../contexts/UserContext/UserContext";

export default function Home({
	notes,
	handleAddNote,
	activeNoteId,
	setActiveNoteId,
	isLoading,
}) {
	const isDesktop = useContext(WindowContext);
	const { activeUser, setActiveUser } = useContext(UserContext);
	return (
		<>
			<div className="side-bar">
				<div className="app-name">
					{isDesktop && <h1>My Notes App</h1>}
					{!isDesktop && (
						<>
							<img
								src={leftArrowIcon}
								className="left-arrow-icon"
								onClick={() => setActiveUser(null)}
							/>
							<h1>{activeUser.name}</h1>
						</>
					)}
				</div>
				<div className="add-note-container">
					<div className="loader-container">{isLoading && <Loader />}</div>
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
