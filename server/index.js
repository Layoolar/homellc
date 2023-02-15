var express    = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const bcrypt = require('bcryptjs')
const app = express()
const port = 1337;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/homellc')


app.get('/', (req, res) => {
	
  res.send('Hello!')
})

app.post('/api/register', async (req, res) => {
 
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			firstName: req.body.firstName,
            lastName: req.body.lastName,
			email: req.body.email,
			password: newPassword,
            // firstName: "Test2233",
            // lastName: "Test1133",
			// email: "test3612@test.com",
			// password: "passw2ord",
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: err })
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