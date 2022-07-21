module.exports.index = async function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    res.render('index', {
        pessoas: await pessoaDB.todasPessoas(),
        formAction: "/insertpessoa",
        pessoaAEditar: {}
    })
}

module.exports.inserirPessoa = async function (application, req, res) {
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

    await pessoaDB.inserirPessoa(pessoa)

    res.redirect("/")
}

module.exports.deletarPessoa = async function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    await pessoaDB.deletarPessoa(req.query)
    res.redirect("/")
}

module.exports.pagEditar = async function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    res.render('index', {
        pessoas: await pessoaDB.todasPessoas(),
        formAction: "/editarpessoa",
        idpessoa: req.query._id,
        pessoaAEditar: await pessoaDB.pesquisarPessoa(req.query)
    })
}

module.exports.editarPessoa = async function (application, req, res) {
    const pessoaDB = new application.app.model.PessoasDAO() // classe PessoasDAO
    await pessoaDB.editarPessoa(req.body._id, {nome: req.body.nome, idade: req.body.idade})
    res.redirect("/")
}