import "./NoteList.css";
import NoteItem from "../NoteItem/NoteItem";

export default function NoteList() {
	return (
		<>
			<div className="note-list">
				<div className="note-item">
					<NoteItem />
				</div>
			</div>
		</>
	);
}
