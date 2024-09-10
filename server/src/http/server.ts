import fastify from 'fastify'

const port = 6969

const app = fastify()

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`HTTP server running on port ${port} 🚀`)
  })
