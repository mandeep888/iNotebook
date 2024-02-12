const connectToMongo = require("./db")
const express = require('express')
connectToMongo();
var cors = require('cors')

const app = express()
const port = 5000


app.use(cors())
app.use(express.json());

// Available routes
// app.get('/', (req, res) => {       //############### Example Route ###########333
//   res.send('Hello World!')
// })

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/note' , require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})

