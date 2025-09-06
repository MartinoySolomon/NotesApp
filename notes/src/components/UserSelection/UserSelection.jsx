import { useContext } from "react";
import UserContext from "../../contexts/UserContext/UserContext";
import WindowContext from "../../contexts/WindowContext/WindowContext";
import "./UserSelection.css";
import rightArrowIcon from "../../assets/arrow.svg";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import AddUser from "../AddUser/AddUser";
import plusIcon from "../../assets/plus.svg";

export default function UserSelection() {
	const { users, activeUser, setActiveUser } = useContext(UserContext);
	const isDesktop = useContext(WindowContext);
	const { openModal } = useContext(ModalContext);
	return (
		<>
			<div className="user-selection">
				{isDesktop && <h2>Switch User</h2>}
				{!isDesktop && (
					<>
						<div className="app-name">
							<h1>My Notes App</h1>
						</div>
						<div className="add-user-button">
							<button onClick={() => openModal(<AddUser />)}>
								{" "}
								<img src={plusIcon} />
								Add User
							</button>
						</div>
					</>
				)}
				<div className="users-list">
					{users.map((user) => {
						return (
							<div
								key={user.id}
								className={`user-item ${
									activeUser && activeUser.id === user.id ? "active" : ""
								}`}
								onClick={() => setActiveUser(user)}>
								{user.name}
								<img src={rightArrowIcon} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
