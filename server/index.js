require('dotenv').config()
const validator = require('validator')
var express    = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const rateLimit = require('express-rate-limit');
const app = express()
const port = 1338;
app.use(cors())

// Request Parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
// rate limiting
app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
}));

// Database connection
mongoose.connect(process.env.MONGODB_URI)

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


    	const finduser = await User.findOne({
		email: email,
	})

	if (finduser) {
		return res.status(400).json({ error: 'User account already exist' })

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

    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ error: "Unable to register" })
  }
})


app.post('/api/login', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Validate email
	if (!validator.isEmail(email)) {
		return res.status(400).json({error: 'Invalid email format' });
	}

	const user = await User.findOne({
		email: email,
	})

	if (!user) {
		return res.status(400).json({ error: 'Invalid login' })
	}

	// Validate password
	if (!validator.isLength(password, { min: 8 })) {
		return res.status(400).json({ status: 'error', error: 'Password must be at least 8 characters long' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (isPasswordValid) {
		const token = jsonwebtoken.sign(
			{
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			process.env.JWT_SECRET
		)
		const name = `${user.firstName} ${user.lastName}`; 
		return res.status(200).json({ status: 'ok', userToken: token, userName: name  })
	} else {
		return res.status(400).json({error: 'Invalid login' });
	}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


