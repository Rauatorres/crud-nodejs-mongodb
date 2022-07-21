
module.exports = function (application) {
    const PessoasDao = class{
        constructor() {
            this.dbConnection = application.app.model.DBconnect
            this.pessoas = this.dbConnection.db.collection("pessoas")
        }

        async executarMetodo(metodo) {
            await this.dbConnection.client.connect()
            await metodo()
            await this.dbConnection.client.close()
        }
        
        async todasPessoas() {
            let res
            await this.executarMetodo(async () => {
                res = await this.pessoas.find().toArray()
            })
            return res
        }
        
        async pesquisarPessoa(requisitos, callback) {
            if (requisitos.hasOwnProperty('_id')) {
                let ObjectID = this.dbConnection.ObjectId
                requisitos._id = new ObjectID(requisitos._id)
            }
            let res
            await this.executarMetodo(async () => {
                res = await this.pessoas.findOne(requisitos)
            })
            return res
        }

        async inserirPessoa(pessoa){
            await this.executarMetodo(async () => {
                await this.pessoas.insertOne(pessoa)
            })
        }

        async deletarPessoa(requisito) {
            // convertendo requisito._id de string para ObjectID pra o mongodb poder ler em formato
            // de ObjectID e bater com o id do documento no banco
            let ObjectID = this.dbConnection.ObjectId
            let requisitoObj = {_id: new ObjectID(requisito._id)}
            await this.executarMetodo(async () => {
                await this.pessoas.findOneAndDelete(requisitoObj)
            })

        }

        async editarPessoa(idObjeto, novo) {
            let ObjectID = this.dbConnection.ObjectId
            let id = new ObjectID(idObjeto)
            await this.executarMetodo(async () => {
                await this.pessoas.updateOne({ _id: id }, { $set: novo })
            })
        }

    }
    return PessoasDao
}


