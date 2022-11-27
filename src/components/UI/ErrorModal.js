import React from "react";
import ReactDOM from "react-dom";
import styles from "./ErrorModal.module.css";
import Button from "./Button";
import Card from "./Card";

const Backdrop = ({ onConfirm }) => {
	return <div onClick={onConfirm} className={styles.backdrop} />;
};

const ModalOverlay = ({ title, message, onConfirm }) => {
	return (
		<Card className={styles.modal}>
			<header className={styles.header}>
				<h2>{title}</h2>
			</header>
			<div className={styles.content}>
				<p>{message}</p>
			</div>
			<footer className={styles.actions}>
				<Button onClick={onConfirm}>Ok</Button>
			</footer>
		</Card>
	);
};

const ErrorModal = ({ onConfirm, title, message }) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onConfirm={onConfirm} />,
				document.getElementById("backdrop-root")
			)}
			{ReactDOM.createPortal(
				<ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
				document.getElementById("overlay-root")
			)}
		</>
	);
};

export default ErrorModal;
