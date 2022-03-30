// npm install mongoose
const Mongoose = require('mongoose')

const user = 'devnilo'
const pass = 'test'
const url = `mongodb://${user}:${pass}@localhost:27017/herois`

Mongoose.connect(url, {useNewUrlParser: true}, (error) => {
    if (!error) return;

    console.log('Falha na conexão!', error)
})

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando!'))

/*
SOBRE STATE

setTimeout(() => {
    const state = connection.readyState
    console.log('state', state) // state 1
}, 1000)

    0 - DESCONECTADO
    1 - CONECTADO
    2 - CONECTANDO
    3 - DESCONECTANDO
*/

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('Heroi', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Clone Laranja',
        poder: 'Clonagem'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItems = await model.find()
    console.log('items', listItems)
}

main()
