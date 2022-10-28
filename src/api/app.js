import fastify from 'fastify'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifySensible from '@fastify/sensible'
import fastifyAuth from '@fastify/auth'

import fastifyDatabase from './plugins/database.js'
import User from './models/user.js'
import Task from './models/task.js'

function loadDocumentation (app, documentation) {
  app.register(fastifySwagger, documentation)

  app.register(fastifySwaggerUi, {
    routePrefix: '/api/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest (request, reply, next) { next() },
      preHandler (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
  })
}

export default function createApp (opts = {}) {
  const { logger = false, knexConfig, documentation } = opts

  const app = fastify({
    logger
  })

  app.register(fastifyDatabase, {
    knexConfig,
    models: [
      User,
      Task
    ]
  })

  app.register(fastifySensible)

  app.decorate('verifyCookie', async (request, reply) => {
    throw new Error('nooo')
  })

  app.register(fastifyAuth)

  if (documentation) loadDocumentation(app, documentation)

  app.register(async (app) => {
    // success response should return wrapped in a data prop
    app.addHook('preSerialization', (request, reply, payload, done) => {
      const newPayload = { data: payload }
      done(null, newPayload)
    })

    await app.register(import('./routes/user.js'), { prefix: 'users' })
    await app.register(import('./routes/task.js'), { prefix: 'tasks' })
  }, { prefix: 'api' })

  return app
}
