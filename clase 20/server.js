import * as dotenv from 'dotenv'
dotenv.config()
import app from './app.js'

const PORT = process.env.PORT || 3000;/* [3] */

app.listen(PORT, () => {
    console.info(`server running in port ${PORT}`)
})