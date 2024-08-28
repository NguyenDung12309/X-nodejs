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

const userCollection = db.getCollection('users')

// delete all document
userCollection.remove({})

// add validate
// db.runCommand({
//   collMod: 'users',
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: ['_id', 'name', 'email', 'password', 'date_of_birth', 'verify', 'created_at', 'updated_at'],
//       properties: {
//         _id: {
//           bsonType: 'objectId',
//           description: 'Phải là một ObjectId'
//         },
//         name: {
//           bsonType: 'string',
//           description: 'Phải là một chuỗi'
//         },
//         email: {
//           bsonType: 'string',
//           description: 'Phải là một chuỗi và bắt buộc'
//         },
//         date_of_birth: {
//           bsonType: 'date',
//           description: 'Phải là một ngày tháng'
//         },
//         password: {
//           bsonType: 'string',
//           description: 'Phải là một chuỗi và bắt buộc'
//         },
//         created_at: {
//           bsonType: 'date',
//           description: 'Phải là một ngày tháng'
//         },
//         updated_at: {
//           bsonType: 'date',
//           description: 'Phải là một ngày tháng'
//         },
//         email_verify_token: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         },
//         forgot_password_token: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         },
//         verify: {
//           bsonType: 'int',
//           enum: [0, 1, 2],
//           description: 'Phải là một trong các giá trị: 0 (unverified), 1 (verified), 2 (banned)'
//         },
//         bio: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         },
//         location: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         },
//         website: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         },
//         username: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         },
//         avatar: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         },
//         cover_photo: {
//           bsonType: ['string', 'null'],
//           description: 'Phải là một chuỗi'
//         }
//       },
//       additionalProperties: false
//     }
//   },
//   validationLevel: 'strict',
//   validationAction: 'error'
// })
