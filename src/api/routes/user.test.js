import { describe, beforeAll, afterAll, test, expect } from 'vitest'
import createApp from '../app.js'
import knexConfig from '../../../knexfile.js'

describe('routes: user', () => {
  let app

  beforeAll(async () => {
    app = createApp({
      knexConfig: {
        ...knexConfig,
        connection: {
          filename: ':memory:'
        }
      }
    })

    await app.ready()

    await app.database.knex.migrate.latest()

    const { User, Task } = app.database.models

    const task1 = await Task.query().insert({
      name: 'save the world',
      description: 'yup'
    })

    const batman = await User.query().insert({
      username: 'batman',
      email: 'batman@yahoo.com',
      password: '12345678',
      birthday: '1989-01-01'
    })

    await batman.$relatedQuery('tasks').relate(task1)
  })

  afterAll(() => app.close())

  test('/', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/users'
    })

    expect(res.statusCode).toBe(200)
    // expect(res.body)
  })
})
