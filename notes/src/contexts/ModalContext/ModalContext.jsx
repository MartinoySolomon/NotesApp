import { createContext, useState } from "react";
import Modal from "../../components/Modal/Modal";


const ModalContext = createContext();
export default ModalContext;

export function ModalProvider({ children }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	function openModal(content) {
		setModalContent(content);
		setIsModalOpen(true);
	}
	function closeModal() {
		setIsModalOpen(false);
		setModalContent(null);
	}

	return (
		<ModalContext.Provider
			value={{
				openModal,
				closeModal,
			}}>
			{children}
            {isModalOpen && <Modal modalContent={modalContent} />}
		</ModalContext.Provider>
	);
}
