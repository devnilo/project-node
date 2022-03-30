const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroiSchema')
const ContextStrategy = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = { 
    nome: 'Homem Aranha', 
    poder: 'Teia' 
}

const MOCK_HEROI_ATUALIZAR = { 
    nome: 'Batman', 
    poder: 'Dinheiro' 
}

let context = {}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new ContextStrategy(new Postgres(connection, model))

        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    
    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('PostgresSQL Register', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    
    it('PostgresSQL List', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id 

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('PostgresSQL Update', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Homem de Ferro'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id})

        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)

        /* No JavaScript temos uma tecnica read/spread que é um metodo usado para mergear objetos
        ou separa-lo */
    })

    it('PostgresSQL Remove', async function () {
        const [item] = await context.read({})
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1)
    })
})