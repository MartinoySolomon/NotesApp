import "./NoteItem.css";

export default function NoteItem({ note, activeNoteId, setActiveNoteId }) {
	const handleClick = () => {
		setActiveNoteId(note.id);
	};

	const isActive= note.id === activeNoteId;

	return (
		<>
			<div className={`note-item ${isActive && 'active'}`} onClick={handleClick}>
				<div className="note-title">{note.title|| 'New Note'}</div>
				<div className="arrow-icon">
					<img src="src/assets/arrow.svg" />
				</div>
			</div>
		</>
	);
}
