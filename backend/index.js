const connectToMongo = require("./db")
const express = require('express')
connectToMongo();

const app = express()
const port = 5000

app.use(express.json());

// Available routes
// app.get('/', (req, res) => {       //############### Example Route ###########333
//   res.send('Hello World!')
// })

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/note' , require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

