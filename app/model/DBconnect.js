const {MongoClient} = require("mongodb")
const ObjectIdReq = require('mongodb').ObjectId

module.exports = function () {
    const client = new MongoClient("mongodb://localhost:27017")
    const connection = {
        client: client,
        db: client.db('crudnodejs'),
        ObjectId: ObjectIdReq
    }
    return connection
}
