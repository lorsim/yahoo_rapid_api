import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
import newsRoutes from './routes/newsRoutes.js'
import analysisRoutes from './routes/analysisRoutes.js'


dotenv.config()

const app = express()

app.use('/api/news', newsRoutes)

app.use('/api/analysis', analysisRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))