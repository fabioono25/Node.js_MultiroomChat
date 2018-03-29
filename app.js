//config do servidor
const app = require('./config/server')

//porta de escuta
//recebendo requisicoes http
let server = app.listen(80, () => {
    console.log('servidor online')
})

//recebendo requisicoes websockets
const io = require('socket.io').listen(server)

//criando variavel global, para ser utilizada nas controllers
app.set('ioMessage', io)

//criacao da conexao por websocket
io.on('connection', (socket) => {
    console.log('Usuário conectou: ' + socket)

    socket.on('disconnect', () => {
        console.log('Usuário desconectou')
    })

    socket.on('msgParaServidor', (data) => {

        //dialogo
        socket.emit('msgParaCliente', 
                    {apelido: data.apelido, mensagem: data.mensagem})

        socket.broadcast.emit('msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem})                    

        //atualizacao da relacao de participantes
        if (parseInt(data.apelido_atualizado_nos_clientes) === 0){
            socket.emit('participantesParaCliente', 
                        {apelido: data.apelido})

            socket.broadcast.emit('participantesParaCliente', 
                        {apelido: data.apelido})
        }
        
    })

    //podemos criar varios eventos de escuta e emissao

}) //pesquisar servidor quando tentativa de conexao for efetuada no cliente

