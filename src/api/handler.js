import awsLambdaFastify from '@fastify/aws-lambda'

import createApp from './app.js'
import knexConfig from '../../knexfile.js'

const app = createApp({
  knexConfig,
  documentation: {
    openapi: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.0'
      }
    },
    // hideUntagged: true,
    exposeRoute: true
  }
})

export const handler = awsLambdaFastify(app)
await app.ready()
