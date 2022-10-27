import fp from 'fastify-plugin'
import Knex from 'knex'
import { Model } from 'objection'

async function fastifyDatabase (app, options) {
  const knexConnection = Knex(options.knexConfig)

  const database = {
    knex: knexConnection,
    models: {}
  }

  Model.knex(knexConnection)

  if (options.models) {
    if (!Array.isArray(options.models) || options.models.length < 1) {
      throw new Error('You need to provide a valid array of `objection.js` models.')
    }

    options.models.forEach(model => {
      if (model.idColumn && model.tableName && model.QueryBuilder) {
        database.models[model.name] = model
        if (model.jsonSchema) app.addSchema({ $id: `${model.name}Request`, ...model.jsonSchema })
        if (model.responseSchema) app.addSchema({ $id: `${model.name}Response`, ...model.responseSchema })
      }
    })

    if (Object.keys(database.models).length < 1) {
      throw new Error('The supplied models are invalid.')
    }
  }

  if (app.database) {
    throw new Error('fastify-database has already registered.')
  }

  app.decorate('database', database)

  app.addHook('onClose', (_, done) => {
    knexConnection.destroy()
    done()
  })
}

export default fp(fastifyDatabase, {
  fastify: '>=4.0.0',
  name: 'fastify-database'
})
