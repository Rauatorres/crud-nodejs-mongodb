module.exports.index = function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    pessoaDB.todasPessoas((result) => {
        res.render('index', {pessoas: result, formAction: "/insertpessoa", pessoaAEditar: {}})
    })
}

module.exports.inserirPessoa = function (application, req, res) {
    // insere pessoa no banco de dados
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    
    // verificação de campos vazios
    let pessoa = {}
    // só adiciona uma propriedade com valor ao objeto pessoa caso o usuário não tenha deixado o campo em branco
    for (const key in req.body) {
        if (req.body[key] != "") {
            pessoa[key] = req.body[key]
        }
    }

    pessoaDB.inserirPessoa(pessoa)

    res.redirect("/")
}

module.exports.deletarPessoa = function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    pessoaDB.deletarPessoa(req.query)
    res.redirect("/")
}

module.exports.pagEditar = function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    pessoaDB.todasPessoas((resultPessoas) => {
        pessoaDB.pesquisarPessoa(req.query, (resultPessoa) => {
            res.render('index', {pessoas: resultPessoas, formAction: "/editarpessoa", idpessoa: req.query._id, pessoaAEditar: resultPessoa})
        })
    })
}

module.exports.editarPessoa = function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    pessoaDB.editarPessoa(req.body._id, {nome: req.body.nome, idade: req.body.idade})
    res.redirect("/")
}