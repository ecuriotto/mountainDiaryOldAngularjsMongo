Comandi utili:

To start the server:
nodemon server.js

Connettersi a mongo:
mongo.exe
Cambiare db: use montagna
show collections
db.diary.find().pretty();
db.diary.find( { _id: '578811d7bd7ed3904874d9c7' } ).pretty()
db.diary.find( { _id: ObjectId('578811d7bd7ed3904874d9a6') } ).pretty()
db.diary.update({ _id: ObjectId('578811d7bd7ed3904874d9a6') }, {id:2, courseType: 'Arrampicata', place:'Novalesa' ,partners:'Stefano', description:'settore Toupè' ,descriptionDetail:'L’inizio 4+; Lo scalino 4; Hale Bopp 5', date : '10/07/2011'}).pretty()