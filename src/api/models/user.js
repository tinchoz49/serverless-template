import S from 'fluent-json-schema'

import Base from './base.js'
import Task from './task.js'

const jsonSchema = S.object()
  .prop('username', S.string().required())
  .prop('email', S.string().format(S.FORMATS.EMAIL).required())
  .prop('password', S.string().minLength(8).required())
  .prop(
    'birthday',
    S.raw({ type: 'string', format: 'date', formatMaximum: '2020-01-01' }) // formatMaximum is an AJV custom keywords
  )

export default class User extends Base {
  // Table name is the only required property.
  static tableName = 'users'

  static jsonSchema = jsonSchema.valueOf()

  static responseSchema = jsonSchema
    .only(['username', 'email', 'birthday'])
    .valueOf()

  static get relationMappings () {
    return {
      tasks: {
        relation: Base.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          through: {
            from: 'usersTasks.userId',
            to: 'usersTasks.taskId'
          },
          to: 'tasks.id'
        }
      }
    }
  }
}
