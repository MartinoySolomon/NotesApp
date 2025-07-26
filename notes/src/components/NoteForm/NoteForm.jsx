import "./NoteForm.css";

export default function NoteForm() {
	return (
		<>
			<div className="note-form">
				<div className="note-title">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						placeholder="Your title here"
					/>
				</div>
				<div className="note-content">
					<label htmlFor="content">Note</label>

					<textarea
                        id="content"
						placeholder="Your content here"
					/>
				</div>
			</div>
		</>
	);
}
