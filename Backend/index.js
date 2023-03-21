const connectToMongo=require('./db.js');
const express = require('express')
var cors = require('cors')
const port = 5000

connectToMongo;

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Success is not greate without failure!')
})

app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook listening on port ${port}`)
})