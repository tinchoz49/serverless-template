
export const up = async (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id')
      table.string('username', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 32).notNullable()
      table.timestamp('birthday')
      table.timestamps(true, true) // useTimestamps=true defaultToNow=true
    })
    .createTable('tasks', (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.timestamps(true, true)
    })
    .createTable('users_tasks', (table) => {
      table.integer('user_id').unsigned().references('users.id')
      table.integer('task_id').unsigned().references('tasks.id')
      table.primary(['user_id', 'task_id'], 'users_tasks_pk')
    })
}

export const down = async (knex) => {
  return knex.schema
    .dropTable('users_tasks')
    .dropTable('tasks')
    .dropTable('users')
}
