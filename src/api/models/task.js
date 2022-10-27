import S from 'fluent-json-schema'

import Base from './base.js'
import User from './user.js'

export default class Task extends Base {
  // Table name is the only required property.
  static tableName = 'tasks'

  static jsonSchema = S.object()
    .prop('name', S.string().required())
    .prop('description', S.string().maxLength(128))
    .valueOf()

  static get relationMappings () {
    return {
      users: {
        relation: Base.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'tasks.id',
          through: {
            from: 'usersTasks.taskId',
            to: 'usersTasks.userId'
          },
          to: 'users.id'
        }
      }
    }
  }
}
