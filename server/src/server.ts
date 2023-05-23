import 'dotenv/config'
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import multipart from '@fastify/multipart'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)
app.register(uploadRoutes)
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(jwt, {
  secret: 'spacetime',
})
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server running in localhost at port 3333')
  })
