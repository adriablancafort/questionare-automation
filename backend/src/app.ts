import fastify from "fastify"
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import documentsRoutes from '@/routes/documents'
import questionnairesRoutes from '@/routes/questionnaires'

const app = fastify()

app.register(cors, {
  origin: true
})

app.register(multipart)

app.register(documentsRoutes, { prefix: '/api/documents' })
app.register(questionnairesRoutes, { prefix: '/api/questionnaires' })

app.get("/", async () => {
  return { status: "ok" }
})

app.listen({ port: 3000 })
