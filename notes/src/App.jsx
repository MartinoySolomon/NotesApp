import { useContext } from "react";
import "./App.css";

import NoteForm from "./components/NoteForm/NoteForm";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import WindowContext from "./contexts/WindowContext/WindowContext";
import UserContext from "./contexts/UserContext/UserContext";
import UserSelection from "./components/UserSelection/UserSelection";

function App() {
	const isDesktop = useContext(WindowContext);
	const { activeUser } = useContext(UserContext);
	return (
		<>
			<BrowserRouter>
				{isDesktop ? (
					<>
						<Home />
						<NoteForm />
					</>
				) : (
					<>
						<Routes>
							{!activeUser && (
								<Route
									path="/"
									element={<UserSelection />}
								/>
							)}
							{activeUser && (
								<Route
									path="/"
									element={<Home />}
								/>
							)}
							<Route
								path="edit/:noteId"
								element={<NoteForm />}
							/>
						</Routes>
					</>
				)}
			</BrowserRouter>
		</>
	);
}

export default App;
