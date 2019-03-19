import React, { Component } from 'react'
import './style/style.css'
import API from './api'
import Header from './components/header/header'
import AddModal from './components/add_modal/add_modal.js'
class App extends Component {
	state = {
		posts: [],
		showModal: false,
		inputImage: '',
		inputName: '',
		inputDescription: ''
	}

	componentDidMount() {
		API().then(posts => {
			if (posts.error) {
				document.querySelector('#error').innerHTML = posts.message
			} else {
				this.setState({ posts })
				console.log(this.state.posts)
			}
		})
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal })
	}

	changeInput = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	addToList = () => {
		let name = this.state.inputName,
			description = this.state.inputDescription,
			image = this.state.inputImage
		API(false, 'POST', { name, description, image }).then(res => {
			if (res.error) {
				document.querySelector('#error').innerHTML = res.message
			} else {
				let addPost = {
					id: res,
					name: name,
					description: description,
					image: image
				}
				this.state.posts.push(addPost)
				this.setState({
					showModal: false,
					inputImage: '',
					inputName: '',
					inputDescription: ''
				})
			}
		})
	}

	render() {
		const {
			showModal,
			inputImage,
			inputName,
			inputDescription
		} = this.state

		return (
			<div className="myBlog">
				<Header />
				<div className="addPost" onClick={this.toggleModal} />
				<ul className="postList">
					{this.state.posts.map(elem => {
						return (
							<li className="postItem" key={elem.id}>
								<h2 className="title">{elem.name}</h2>
								<img
									className="image"
									src={elem.image}
									alt=""
								/>
								<p className="description">
									{elem.description}
								</p>
							</li>
						)
					})}
				</ul>
				<AddModal
					changeInput={this.changeInput}
					inputName={inputName}
					inputImage={inputImage}
					inputDescription={inputDescription}
					addToList={this.addToList}
					showModal={showModal}
					toggleModal={this.toggleModal}
				/>
			</div>
		)
	}
}

export default App
