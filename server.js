const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

// initializations
const app = express()
const PORT = process.env.PORT || 8000

// built-in middlewares
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

const whiteList = [process.env.URL]

const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// api routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/_views/index.html'))
})
app.get('/get-single-page/:id', (req, res) => {
	res.sendFile(path.join(__dirname, '/_views/get-single-page.html'))
})
app.get('/post-page', (req, res) => {
	res.sendFile(path.join(__dirname, '/_views/post-page.html'))
})
app.get('/edit-page', (req, res) => {
	res.sendFile(path.join(__dirname, '/_views/edit-page.html'))
})
app.get('/delete-page', (req, res) => {
	res.sendFile(path.join(__dirname, '/_views/delete-page.html'))
})

app.use('/contacts', require('./_routes/api/contact.js'))

// catch all
app.all('*', (req, res) => {
	res.status(404)
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, '_views/404.html'))
	} else if (req.accepts('json')) {
		res.json({ error: '404 Not Found' })
	} else {
		res.type('txt').send('404 Not Found')
	}
})

// listen
app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
