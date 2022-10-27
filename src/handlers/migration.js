import Knex from 'knex'

import config from '../../knexfile.js'

function createConnection () {
  return Knex(config)
}

export const latest = async () => {
  let knex
  try {
    knex = createConnection()
    const [batchNo, log] = await knex.migrate.latest()
    if (log.length === 0) {
      console.log('>> Already up to date')
    }
    console.log(`>> Batch ${batchNo} run: ${log.length} migrations`)
  } catch (err) {
    console.error(err)
  }
  knex && knex.destroy()
}

export const rollback = async () => {
  let knex
  try {
    knex = createConnection()
    const [batchNo, log] = await knex.migrate.rollback(null, false)
    if (log.length === 0) {
      console.log('>> Already at the base migration')
    }
    console.log(`>> Batch ${batchNo} rollback: ${log.length} migrations`)
  } catch (err) {
    console.error(err)
  }
  knex && knex.destroy()
}
