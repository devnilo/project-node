
// docker ps

// comando para iniciar
// docker exec -it 03f22e83f09c mongo -u devnilo -p test --authenticationDatabase herois 

// mostrar databases
// show dbs

// mudando o contexto para uma database
// use herois

// mostrar tables(coleções)
// show collections 

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1999-09-09'
})

db.herois.find()
db.herois.find().pretty()

for(let i = 0; i <= 50000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1999-09-09'
    })
}

db.herois.count() // traz a contagem de herois
db.herois.findOne() // traz um heroi
db.herois.find().limit(1000).sort({nome: -1}) // traz 1000 herois na contagem decrescente
db.herois.find({}, {poder: 1, _id: 0}) // traz só o poder do heroi

// --------------------------------------------------------------------------------------------------

// CREATE
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1999-09-09'
})


// READ
db.herois.find()


// UPDATE
db.herois.update({_id: ObjectId("623a2d2bb1b487372657e204")},
    {
        nome: 'Devagar',
        poder: 'Lentidão',
        dataNascimento: '2500-05-05'
    })

// para mudar apenas o nome
db.herois.update({_id: ObjectId("623a2d2bb1b487372657e204")},
    {$set: {nome: 'Clone Laranja'}})

// quando tentarmos mudar o poder dos Clones, mesmo que varios clones tenham o mesmo poder, ele irá mudar apenas do primeiro
// que encontrar 
db.herois.update(({poder: 'Velocidade'}),
    {$set: {poder: 'Super Força'}}) 
    /* db.herois.find({poder: 'Super Força'}) - o resultado será apenas que modificou o Clone-0, e o restante que tem o poder
    de velocidade não irá alterar */


// DELETE
db.herois.remove({})
db.herois.remove({nome: 'Devagar'})
