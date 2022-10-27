export default async (app) => {
  const { User } = app.database.models

  app.get('/', {
    async handler () {
      return await User.query()
    },
    // preHandler: app.auth([
    //   app.verifyCookie
    // ]),
    schema: {
      response: {
        '2xx': {
          description: 'List user response.',
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: 'UserResponse'
              }
            }
          }
        },
        '4xx': {
          description: 'Error response.',
          type: 'object',
          properties: {
            statusCode: {
              type: 'number'
            },
            error: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  })

  // app.get('/:id', {
  //   schema: {
  //     response: {
  //       default: {
  //         type: 'object',
  //         properties: {
  //           data: {
  //             type: 'array',
  //             items: User.jsonSchema
  //           }
  //         }
  //       }
  //     }
  //   }
  // }, async (req) => {
  //   return {
  //     data: [{
  //       username: 'hola',
  //       email: 'test@test.com',
  //       password: 'test12354687',
  //       birthday: '2020-01-01',
  //       test: 'test'
  //     }]
  //   }
  // })
}
