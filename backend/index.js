 const connectToMongo=require('./db')
 const express = require('express')
 connectToMongo();

const app = express()
const port = 5000 // port is set to 5000 because localhost port 3000 will be working for React application

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})