import { useEffect } from "react";
import "./SavedNotification.css";

export default function SavedNotification({ isSaved, setIsSaved }) {
	useEffect(() => {
		const timoutId = setTimeout(() => {
			setIsSaved(false);
		}, 2000);
		return () => {
			clearTimeout(timoutId);
		};
	}, [isSaved]);

	return (
		<>
			<div className={`saved-notification ${!isSaved && `hidden`}`}>Saved!</div>
		</>
	);
}
