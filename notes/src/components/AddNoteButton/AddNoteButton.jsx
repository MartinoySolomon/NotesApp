import "./AddNoteButton.css";
import plusIcon from "../../assets/plus.svg";

export default function AddNoteButton({ handleAddNote }) {
	return (
		<>
			<button
				type="button"
				onClick={handleAddNote}>
				<img src={plusIcon} />
				Add Note
			</button>
		</>
	);
}
