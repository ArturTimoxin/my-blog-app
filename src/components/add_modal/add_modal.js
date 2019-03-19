import React from 'react'

export const AddModal = ({ changeInput, inputName, inputImage, inputDescription, addToList, showModal, toggleModal }) => (
	<div className={`createPost ${showModal ? 'open' : ''}`}>
		<div className="wrapper">
			<div className="closeModal" onClick={toggleModal}>+</div>
			<h2>Add post</h2>
			<input
				className="inputName"
				type="text"
				onChange={changeInput}
				name="inputName"
				placeholder="Post name"
				value={inputName}
			/>
			<input
				className="inputDescription"
				type="text"
				onChange={changeInput}
				name="inputDescription"
				placeholder="Description"
				value={inputDescription}
			/>
			<input
				className="inputImage"
				type="text"
				onChange={changeInput}
				name="inputImage"
				placeholder="URL for image"
				value={inputImage}
			/>
			<button onClick={addToList}>Create post</button>
			<div id="error" />
		</div>
	</div>
)

export default AddModal
