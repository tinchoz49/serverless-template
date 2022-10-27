import { Model, AjvValidator } from 'objection'
import addFormats from 'ajv-formats'

export default class BaseModel extends Model {
  static createValidator () {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        addFormats(ajv)
      },
      options: {
        allErrors: true,
        validateSchema: true,
        ownProperties: true
      }
    })
  }
}
