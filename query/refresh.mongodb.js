/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('X')

const refreshTokenCollection = db.getCollection('refreshToken')

// delete all document
refreshTokenCollection.remove({})

// add validate
db.runCommand({
  collMod: 'refreshToken',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['_id', 'token', 'created_at', 'verify', 'user_id', 'exp', 'iat'],
      properties: {
        _id: {
          bsonType: 'objectId',
          description: 'Phải là một ObjectId và bắt buộc'
        },
        token: {
          bsonType: 'string',
          description: 'Phải là một chuỗi và bắt buộc'
        },
        created_at: {
          bsonType: 'date',
          description: 'Phải là một ngày tháng và bắt buộc'
        },
        user_id: {
          bsonType: 'objectId',
          description: 'Phải là một ObjectId và bắt buộc'
        },
        verify: {
          bsonType: 'int',
          enum: [0, 1, 2],
          description: 'Phải là một trong các giá trị: 0 (unverified), 1 (verified), 2 (banned)'
        },
        exp: {
          bsonType: 'date',
          description: 'Phải là một ngày tháng và bắt buộc'
        },
        iat: {
          bsonType: 'date',
          description: 'Phải là một ngày tháng và bắt buộc'
        }
      },
      additionalProperties: false
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
})
