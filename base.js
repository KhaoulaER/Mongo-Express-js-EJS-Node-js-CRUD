var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/cadcutilisateur';
MongoClient.connect(url,function(err,db){
    if(err) throw err;
    console.log('la base est crée');
    db.close();
});