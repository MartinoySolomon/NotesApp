import { createContext, use, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { db } from "../../firebase-config";
import {
	collection,
	getDocs,
	doc,
	setDoc,
} from "firebase/firestore";

const UserContext = createContext();
export default UserContext;
export function UserProvider({ children }) {
	const [activeUser, setActiveUser] = useState(null);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const loadUsers = async () => {
			// setIsLoading(true);
			try {
				const usersArray = await fetchUsersFromFirebase();
				setUsers(usersArray);
			} catch (error) {
				console.error("Error loading users:", error);
				return;
			} finally {
				// setIsLoading(false);
			}
		};
		loadUsers();
	}, []);

	async function fetchUsersFromFirebase() {
		try {
			const usersCollectionRef = collection(db, "users");
			const usersSnapshot = await getDocs(usersCollectionRef);
			const usersList = usersSnapshot.docs.map((doc) => {
				const userData = doc.data();
				const userId = doc.id;
				return {
					...userData,
					id: userId,
				};
			});
			return usersList;
		} catch (error) {
			console.error("Error fetching users", error);
			return [];
		}
	}

	async function handleAddUser(userName) {
		const newUserId = uuid();
		const newUserData = {
			name: userName,
		};
		const newUser = { id: newUserId, name: userName };
		// setIsLoading(true);
		try {
			const newUserRef = doc(db, "users", newUserId);
			await setDoc(newUserRef, newUserData);
			const updatedUsers = await fetchUsersFromFirebase();
			setUsers(updatedUsers);
			setActiveUser(newUser);
		} catch (error) {
			console.error("Error adding note:", error);
			return;
		} finally {
			// setIsLoading(false);
		}
	}

	return (
		<UserContext.Provider
			value={{ activeUser, setActiveUser, users, setUsers, handleAddUser }}>
			{children}
		</UserContext.Provider>
	);
}
