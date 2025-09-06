import { useContext } from "react";
import UserContext from "../../contexts/UserContext/UserContext";
import "./AddNoteButton.css";
import plusIcon from "../../assets/plus.svg";

export default function AddNoteButton({ handleAddNote }) {
	const { activeUser } = useContext(UserContext);
	return (
		<>
			<div className={`add-note-button ${!activeUser && "disabled"}`}>
				<button
					type="button"
					onClick={handleAddNote}
					disabled={!activeUser}>
					<img src={plusIcon} />
					Add Note
				</button>
			</div>
		</>
	);
}
