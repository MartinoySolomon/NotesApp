import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WindowProvider } from "./contexts/WindowContext/WindowContext.jsx";

createRoot(document.getElementById("root")).render(
	<WindowProvider>
		<App />
	</WindowProvider>
)
