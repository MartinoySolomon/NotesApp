import "./NoteItem.css";

export default function NoteItem({ note, activeNoteId, setActiveNoteId }) {
	const handleClick = () => {
		setActiveNoteId(note.id);
	};

	const isActiv= note.id === activeNoteId;

	return (
		<>
			<div className={`note-item ${isActiv && 'active'}`} onClick={handleClick}>
				<div className="note-title">{note.title|| 'New Note'}</div>
				<div className="arrow-icon">
					<img src="src/assets/arrow.svg" />
				</div>
			</div>
		</>
	);
}
