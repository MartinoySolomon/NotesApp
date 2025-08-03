import { useContext } from "react";
import "./NoteItem.css";
import WindowContext from "../../contexts/WindowContext/WindowContext";
import { useNavigate } from "react-router";

export default function NoteItem({ note, activeNoteId, setActiveNoteId }) {
	const isDesktop = useContext(WindowContext);
	const navigate = useNavigate();
	const handleClick = () => {
		setActiveNoteId(note.id);
	};

	const isActive= note.id === activeNoteId;

	return (
		<>
			<div className={`note-item ${isActive && 'active'}`} onClick={
				isDesktop
					? handleClick
					: () => {
							handleClick();
							navigate(`/edit/${note.id}`);
										}}>
				<div className="note-title">{note.title|| 'New Note'}</div>
				<div className="arrow-icon">
					<img src="src/assets/arrow.svg" />
				</div>
			</div>
		</>
	);
}
