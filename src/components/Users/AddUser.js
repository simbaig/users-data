import React, { useState, useRef } from "react";
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

const AddUsers = ({ onAddUser }) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const [error, setError] = useState();

	const addUserHandler = (e) => {
		e.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredAge = ageInputRef.current.value;

		if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({
				title: "Invalid input",
				message: "Please enter a valid name and age (non-empty values)",
			});
			return;
		}
		if (+enteredAge < 0) {
			setError({
				title: "Invalid age",
				message: "Please enter a valid age (>0)",
			});
			return;
		}
		onAddUser(enteredName, enteredAge);
		nameInputRef.current.value = "";
		ageInputRef.current.value = "";
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<Wrapper>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						placeholder="Enter username"
						ref={nameInputRef}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						placeholder="Enter age"
						ref={ageInputRef}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default AddUsers;
