/*
 * Подключаем нужные модули для этого файла
 * Файл отвечает за роуты http://localhost:3001/posts/*
 * Это видно в файле index.js 17:строка
 */
const express = require('express') // нужен сам експресс как фреймворок
const setRandom = require('../helpers/set_random') // написал функцию для случайной айдишки
const router = express.Router() // тут соответственно сам роутер из фреймворка

let postsArray = [
	{
		id: 'xwP7a',
		name: 'Post about cars',
		image:
			'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2019/collections/highlights/3-2/19mst_highlights_profile_31.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
		description: 'This is a Ford Mustang.'
	},
	{
		id: '8ik7m',
		name: 'Post about laptops',
		image: 'https://i.ytimg.com/vi/-tdfFeKJkOg/maxresdefault.jpg',
		description: 'I am first post about laptops.'
	},
	{
		id: 'OvWtk',
		name: 'New newspaper about social networks',
		image:
			'https://assets.pando.com/_versions/2013/03/facebook-newspaper_featured.jpg',
		description: 'Ukraine has a new newspaper about social networks.'
	}
]

/*
 * Получаем краткий массив постов postsArray, объявлен свеху
 * GET    http://localhost:3001/posts/
 */
router.get('/', function(req, res) {
	res.status(200).send(
		postsArray.map(
			elem =>
				(shortElem = {
					id: elem.id,
					name: elem.name,
					image: elem.image,
					description: elem.description
				})
		)
	)
})

/*
 * Получаем один пост по ID
 * GET    http://localhost:3001/posts/:id
 * ID это строка, смотри postsArray сверху
 */
router.get('/:id', function(req, res) {
	let result = postsArray.find(elem => elem.id === req.params.id)
	if (result) {
		res.status(200).send(result)
	} else {
		res.status(404).send({
			error: true,
			message: 'There is not such post with id ' + req.params.id
		})
	}
})

/*
 * Создаем пост, отправляем в body наш json
 * POST    http://localhost:3001/posts/
 * Пример json-a для нашего body
 *  {
 * 		"name":"String",
 *		"image": "String",
 *		"description": "String"
 *	}
 */
router.post('/', function(req, res) {
	let name = req.body.name,
		image = req.body.image,
		description = req.body.description,
		id = setRandom(),
		likes = 0

	if (name && image && description) {
		postsArray.push({ id, name, image, description })
		res.status(200).send({ id })
	} else if (!name || name === '') {
		res.status(400).send({ error: true, message: 'Name is not valid' })
	} else if (!description || description === '') {
		res.status(400).send({
			error: true,
			message: 'Description is not valid'
		})
	} else if (!image || image === '') {
		res.status(400).send({ error: true, message: 'Image is not valid' })
	} else {
		res.status(400).send({ error: true, message: 'Bad request' })
	}
})

/*
 * Удаляем пост по ID
 * DELETE    http://localhost:3001/posts/:id
 * ID это строка, смотри postsArray сверху
 */
router.delete('/:id', function(req, res) {
	if (req.params.id) {
		let newArray = postsArray.filter(elem => {
			if (elem.id !== req.params.id) {
				return elem
			}
		})

		if (newArray.length === postsArray.length - 1) {
			postsArray = newArray
			res.status(200).send({ message: 'Deleted successfully' })
		} else {
			res.status(404).send({
				error: true,
				message: 'There is not such post with id ' + req.params.id
			})
		}
	} else {
		res.status(400).send({
			error: true,
			message: 'Id parametr is required'
		})
	}
})

module.exports = router
