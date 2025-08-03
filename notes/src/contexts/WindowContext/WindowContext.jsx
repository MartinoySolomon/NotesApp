import { createContext } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions/useWindowDimensions";

const WindowContext = createContext();
export default WindowContext;
export function WindowProvider({ children }) {
	const { width, height } = useWindowDimensions();
	const isDesktop = width >= 780;

	return (
		<WindowContext.Provider value={isDesktop}>
			{children}
		</WindowContext.Provider>
	);
}
