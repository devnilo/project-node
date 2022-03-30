const ICrud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'DESCONECTADO',
    1: 'CONECTADO',
    2: 'CONECTANDO',
    3: 'DESCONECTANDO'
}


class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]

        if (state === 'CONECTADO') return state;

        if (state !== 'CONECTANDO') return state;

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]
    }

    static connect() {
        const user = 'devnilo'
        const pass = 'test'
        const url = `mongodb://${user}:${pass}@localhost:27017/herois`

        Mongoose.connect(url, { useNewUrlParser: true }, (error) => {
            if (!error) return;

            console.log('Falha na conexão!', error)
        })

        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando!'))

        return connection;
    }

    create(item) {
        return this._schema.create(item)
    }

    read(item, skip=0, limit=10) {
        return this._schema.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set: item})
    }

    delete(id) {
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDB