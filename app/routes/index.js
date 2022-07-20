module.exports = (application) => {
    application.get('/', function(req, res) {
        application.app.controller.index.index(application, req, res)
    })

    application.post("/insertpessoa", function(req, res){
        application.app.controller.index.inserirPessoa(application, req, res)
    })
    application.post("/editarpessoa", function(req, res){
        application.app.controller.index.editarPessoa(application, req, res)
    })

    application.get("/excluir", function (req, res) {
        application.app.controller.index.deletarPessoa(application, req, res)
    })

    application.get('/pag_editar', function (req, res) {
        application.app.controller.index.pagEditar(application, req, res)
    })
}