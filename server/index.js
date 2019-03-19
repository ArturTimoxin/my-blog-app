var express = require("express")
var bodyParser = require("body-parser")
var posts = require("./router/posts.js")
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH')
	next()
})

app.use('/posts', posts)
app.use('/*', function (req, res) {
	res.status(404).send({ error: true, message: 'Not found such route. please read API documentation' })
})

var server = app.listen(3003, function () {
	console.log("app running on port.", server.address().port)
})
