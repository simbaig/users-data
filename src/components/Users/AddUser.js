import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

const AddUsers = ({ onAddUser }) => {
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredAge, setEnteredAge] = useState("");
	const [error, setError] = useState();

	const userNameChangeHandler = (e) => {
		setEnteredUsername(e.target.value);
	};

	const userAgeChangeHandler = (e) => {
		setEnteredAge(e.target.value);
	};

	const addUserHandler = (e) => {
		e.preventDefault();
		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
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
		onAddUser(enteredUsername, enteredAge);
		setEnteredUsername("");
		setEnteredAge("");
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<div>
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
						value={enteredUsername}
						onChange={userNameChangeHandler}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						placeholder="Enter age"
						value={enteredAge}
						onChange={userAgeChangeHandler}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUsers;
