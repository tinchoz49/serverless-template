import { knexSnakeCaseMappers } from 'objection'

export default {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './db.sqlite'
  },
  migrations: {
    extension: 'mjs',
    directory: './migrations',
    loadExtensions: ['.mjs']
  },
  seeds: {
    extension: 'mjs',
    directory: './seeds',
    loadExtensions: ['.mjs']
  },
  ...knexSnakeCaseMappers() // Function for adding a snake_case to camelCase conversion to knex
}
