import awsLambdaFastify from '@fastify/aws-lambda'

import createApp from './app.js'
import knexConfig from '../../knexfile.js'

const app = createApp({
  knexConfig,
  documentation: {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.0'
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    // hideUntagged: true,
    exposeRoute: true
  }
})

export const handler = awsLambdaFastify(app)
await app.ready()
