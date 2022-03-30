const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const HeroisSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const ContextStrategy = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Clone Laranja',
    poder: 'Clonagem'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Clone Branco-${Date.now()}`,
    poder: 'Clonagem'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Clone Preto-${Date.now()}`,
    poder: 'Clonagem'
}

let MOCK_HEROI_ID = ''

let context = {}

describe('MongoDB Suite de testes', function() {
    this.beforeAll(async () => {
        const connection = MongoDB.connect()
        context = new ContextStrategy(new MongoDB(connection, HeroisSchema))

        await context.create(MOCK_HEROI_DEFAULT)

        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })

    it('MongoDB Connection', async () => {
        const result = await context.isConnected()
        const expected = 'CONECTADO'

        assert.deepEqual(result, expected)
    })

    it('MongoDB Register', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('MongoDB List', async () => {
         const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
         const result = {
            nome, poder
        } 

        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('MongoDB Update', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Capudo'
        })

        assert.deepEqual(result.modifiedCount, 1)
    })

    it('MongoDB Remove', async () => {
        const result = await context.delete(MOCK_HEROI_ID)

        assert.deepEqual(result.deletedCount, 1)
    })
})