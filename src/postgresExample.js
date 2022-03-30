// npm install sequelize pg-hstore pg
const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'devnilo',
    'test',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    }
)

async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },

        nome: {
            type: Sequelize.STRING,
            required: true
        },

        poder: {
            type: Sequelize.STRING,
            required: true
        }
    },  {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        }
    )

    await Herois.sync()
/*    await Herois.create({
        nome: 'Lanterna Verde',
        poder: 'Anel'
    }) */ // - para criar um heroi novo no banco de dados

    const result = await Herois.findAll({ 
        raw: true,
//      attributes: ['nome'] - para mostrar apenas o nome
    })
    console.log('result', result)
}

main()