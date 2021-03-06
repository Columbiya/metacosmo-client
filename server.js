import { express } from 'express';
import * as path from 'path'

const PORT = process.env.PORT || 8080
const __dirname = path.resolve()

const app = express()
app.use(express.static(__dirname))
app.use(express.static(__dirname, 'build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)