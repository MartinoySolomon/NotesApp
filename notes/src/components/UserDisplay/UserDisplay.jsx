import userIcon from "../../assets/user-icon.svg";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext/UserContext";
import "./UserDisplay.css";
import UserSelection from "../UserSelection/UserSelection";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import AddUser from "../AddUser/AddUser";
import WindowContext from "../../contexts/WindowContext/WindowContext";
export default function UserDisplay() {
	const { activeUser } = useContext(UserContext);
	const { openModal } = useContext(ModalContext);
    const isDesktop = useContext(WindowContext);
	return (
		<>
			<div className="user-display">
				<button onClick={() => openModal(<> <UserSelection />{isDesktop && <AddUser />}</>)}>Switch</button>
				<img
					src={userIcon}
					alt="User Icon"
				/>
				<div className="user-name-display">
					<span>{activeUser ? activeUser.name : "No User"}</span>
				</div>
			</div>
		</>
	);
}
