
import './main/config/module-alias'
import express, { Router } from 'express'
import { setupRoutes } from './main/config/routes'

const app = express()

app.use(express.json())
setupRoutes(app)

app.listen(8081, () => console.log(`Server is running on 8081 port`))
export { app }