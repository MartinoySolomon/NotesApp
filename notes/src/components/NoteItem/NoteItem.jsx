import { useContext } from "react";
import "./NoteItem.css";
import WindowContext from "../../contexts/WindowContext/WindowContext";
import { useNavigate } from "react-router";
import rightArrowIcon from "../../assets/arrow.svg";

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
					{!isDesktop &&  <span className="edit-mobile-span">Edit</span>}
					<img src={rightArrowIcon} />
				</div>
			</div>
		</>
	);
}
