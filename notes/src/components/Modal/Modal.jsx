import { useContext } from "react";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import "./Modal.css";

export default function Modal({ modalContent }) {
	const { openModal, closeModal } = useContext(ModalContext);
	return (
		<>
			<div
				className="modal"
				onClick={closeModal}>
				<div
					className="modal-content"
					onClick={(e) => e.stopPropagation()}>
					{modalContent}
				</div>
			</div>
		</>
	);
}
