
module.exports = function (application) {
    const PessoasDao = class{
        constructor() {
            this.dbConnection = application.app.model.DBconnect
            this.pessoas = this.dbConnection.db.collection("pessoas")
        }
        
        todasPessoas(callback) {
            this.pessoas.find().toArray((err, data) => {
                callback(data)
            })
        }
        
        pesquisarPessoa(requisitos, callback) {
            if (requisitos.hasOwnProperty('_id')) {
                    let ObjectID = this.dbConnection.ObjectId
                    requisitos._id = new ObjectID(requisitos._id)
                }
                this.pessoas.findOne(requisitos, (err, data) => {
                    callback(data)

                })
        }

        inserirPessoa(pessoa){
            this.pessoas.insertOne(pessoa, (err, data) => {
            })

        }

        deletarPessoa(requisito) {
            // convertendo requisito._id de string para ObjectID pra o mongodb poder ler em formato
            // de ObjectID e bater com o id do documento no banco
            let ObjectID = this.dbConnection.ObjectId
            let requisitoObj = {_id: new ObjectID(requisito._id)}
            this.pessoas.findOneAndDelete(requisitoObj, (err, data) => {
            })

        }

        editarPessoa(idObjeto, novo) {
            let ObjectID = this.dbConnection.ObjectId
            let id = new ObjectID(idObjeto)
            this.pessoas.updateOne({ _id: id }, { $set: novo }, () => {
            })
        }

    }
    return PessoasDao
}


