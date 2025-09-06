import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WindowProvider } from "./contexts/WindowContext/WindowContext.jsx";
import { UserProvider } from "./contexts/UserContext/UserContext.jsx";
import { ModalProvider } from "./contexts/ModalContext/ModalContext.jsx";

createRoot(document.getElementById("root")).render(
	<WindowProvider>
		<UserProvider>
			<ModalProvider>
				<App />
			</ModalProvider>
		</UserProvider>
	</WindowProvider>
);
