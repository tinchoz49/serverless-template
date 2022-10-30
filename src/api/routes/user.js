import S from 'fluent-json-schema'

export default async (app) => {
  const { User } = app.database.models

  app.get('/', {
    async handler () {
      return User.query()
    },
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
        default: {
          $ref: 'ErrorResponse'
        }
      }
    }
  })

  app.get('/:id', {
    async handler (req) {
      return (await User.query().findById(req.params.id) || null)
    },
    schema: {
      params: S
        .object()
        .prop('id', S.number().required()),
      response: {
        '2xx': {
          type: 'object',
          properties: {
            data: {
              anyOf: [
                {
                  $ref: 'UserResponse'
                },
                { type: 'null' }
              ]
            }
          }
        },
        default: {
          $ref: 'ErrorResponse'
        }
      }
    }
  })

  app.post('/', {
    async handler (req) {
      return await User.query().insert(req.body)
    },
    schema: {
      body: {
        $ref: 'UserRequest'
      },
      response: {
        '2xx': {
          type: 'object',
          properties: {
            data: {
              $ref: 'UserResponse'
            }
          }
        },
        default: {
          $ref: 'ErrorResponse'
        }
      }
    }
  })
}
