import React, { useRef, useContext } from "react";
import UserContext from "../../contexts/UserContext/UserContext";
import WindowContext from "../../contexts/WindowContext/WindowContext";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import "./AddUser.css";

export default function AddUser() {
	const inputRef = useRef(null);
	const { handleAddUser } = useContext(UserContext);
	const isDesktop = useContext(WindowContext);
	const { closeModal } = useContext(ModalContext);

	return (
		<>
			{isDesktop && (
				<>
					<h6>or</h6>
				</>
			)}

			<h4>Add User</h4>
			<div className="add-user">
				<input
					type="text"
					ref={inputRef}
					placeholder="User name here"
				/>
				<button
					onClick={() => {
						const userName = inputRef.current.value;
						if (userName) {
							handleAddUser(userName);
							inputRef.current.value = "";
							closeModal();
						}
					}}>
					Add
				</button>
			</div>
		</>
	);
}
