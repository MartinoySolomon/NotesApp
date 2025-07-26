import './AddNoteButton.css'

export default function AddNoteButton({handleAddNote}) {
	return <>
    <button type="button" onClick={handleAddNote}><img src="src/assets/plus.svg"/>Add Note</button>
    
    </>;
}
