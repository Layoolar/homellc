require('dotenv').config()
const validator = require('validator')
var express    = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const app = express()
const port = 1337;
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())


// app.use(express.json())

// mongoose.connect('mongodb://localhost:27017/homellc')
mongoose.connect(process.env.MONGODB_URI)
console.log(process.env.MONGODB_URI)

app.get('/', (req, res) => {
	
  res.send('Hello!')
})

// app.post('/api/register', async (req, res) => {
 
// 	console.log(req.body)
// 	try {
// 		const newPassword = await bcrypt.hash(req.body.password, 10)
// 		await User.create({
// 			firstName: req.body.firstName,
//             lastName: req.body.lastName,
// 			email: req.body.email,
// 			password: newPassword,
// 		})
// 		res.json({ status: 'ok' })
// 	} catch (err) {
// 		res.json({ status: 'error', error: err })
// 	}
// })

// app.post('/api/login', async (req, res) => {
// 	console.log(req.body)
// 	const user = await User.findOne({
// 		email: req.body.email,
// 	})

// 	if (!user) {
// 		console.log('Invalid login')
// 		return res.json({ status: 'error', error: 'Invalid login' })
// 	}

// 	const isPasswordValid = await bcrypt.compare(
// 		req.body.password,
// 		user.password
// 	)

// 	if (isPasswordValid) {
// 		const token = jsonwebtoken.sign(
// 			{
// 				firstName: user.firstName,
// 				lastName: user.lastName,
// 				email: user.email,
// 			},
// 			// '2c0a25d0-7de3-42a3-8e91-0d03aa7f56a9'
// 			process.env.JWT_SECRET
// 		)
		
// 		return res.json({ status: 'ok', user: token })
// 	} else {
// 		console.log('false')
// 		return res.json({ status: 'error', user: false })
// 	}
// })

app.post('/api/register', async (req, res) => {
  try {
    // Validate and sanitize user input
    const firstName = validator.trim(req.body.firstName)
    const lastName = validator.trim(req.body.lastName)
    const email = validator.trim(req.body.email)
    const password = validator.trim(req.body.password)

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    if (!validator.isLength(firstName, { min: 2, max: 50 })) {
      return res.status(400).json({ error: 'First name must be between 2 and 50 characters' })
    }

    if (!validator.isLength(lastName, { min: 2, max: 50 })) {
      return res.status(400).json({ error: 'Last name must be between 2 and 50 characters' })
    }

    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    res.json({ status: 'ok' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/login', async (req, res) => {
	console.log(req.body.email)
	const email = req.body.email;
	const password = req.body.password;

	// Validate email
	if (!validator.isEmail(email)) {
		console.log('Invalid email format');
		return res.json({ status: 'error', error: 'Invalid email format' });
	}

	const user = await User.findOne({
		email: email,
	})

	if (!user) {
		console.log('Invalid login')
		return res.json({ status: 'error', error: 'Invalid login' })
	}

	// Validate password
	if (!validator.isLength(password, { min: 8 })) {
		console.log('Password must be at least 8 characters long');
		return res.json({ status: 'error', error: 'Password must be at least 6 characters long' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (isPasswordValid) {
		const token = jsonwebtoken.sign(
			{
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			// '2c0a25d0-7de3-42a3-8e91-0d03aa7f56a9'
			process.env.JWT_SECRET
		)
		
		return res.json({ status: 'ok', user: token })
	} else {
		console.log('Invalid password');
		return res.json({ status: 'error', error: 'Invalid password' });
	}
})


app.get('/api/home', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', name: `${user.firstName} ${user.lastName}` })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// const express = require('express');
// var bodyParser = require('body-parser')
// const app = express();
// // app.use(bodyParser.urlencoded({
// //   extended: true
// // }));
// app.use(express.json())
// // const bodyParser = require('body-parser')
// const port = 1337;
// // const cors = require('cors')
// // const mongoose = require('mongoose')
// // const User = require('./models/user.model')
// // const bcrypt = require('bcryptjs')


// // mongoose.connect('mongodb://localhost:27017/homellc')




// // app.get('/', (req, res) => {
// //   res.send('Hello!')
// // })

// app.post('/test', function(req,res) {
//   // Without `express.json()`, `req.body` is undefined.
//   console.log(`${req.body}`);
// 	res.send('Hello!')
// });


// app.post('/api/register', async (req, res) => {
// 	console.log(req.body)
// 	try {
// 		// const newPassword = await bcrypt.hash(req.body.password, 10)
// 		await User.create({
// 			firstName: req.body.firstName,
//             lastName: req.body.lastName,
// 			email: req.body.email,
// 			password: req.body.password,
//             // firstName: "Test",
//             // lastName: "Test",
// 			// email: "test@test.com",
// 			// password: "password",
// 		})
// 		res.json({ status: 'ok' })
// 	} catch (err) {
// 		res.json({ status: 'error', error: 'Duplicate email' })
// 	}
// })



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })