const express = require('express');
const app = express();
const port = 1337;
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/homellc')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		// const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			firstName: req.body.firstName,
            lastName: req.body.lastName,
			email: req.body.email,
			password: password,
            // firstName: "Test",
            // lastName: "Test",
			// email: "test@test.com",
			// password: "password",
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})