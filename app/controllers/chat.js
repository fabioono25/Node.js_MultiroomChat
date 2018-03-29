module.exports.initChat = (application, req, res) => {
    
    const dadosForm = req.body

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty()
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15)
    
    const erros = req.validationErrors()

    if (erros){
        //res.send('Existem erros no formulario')
        res.render('index', {validacao: erros})
        return
    }

    application.get('ioMessage').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: ' Acabou de entrar no chat '}
        //'Mensagem de Teste Retorno'
    )

    res.render('chat', {dadosForm: dadosForm})
}