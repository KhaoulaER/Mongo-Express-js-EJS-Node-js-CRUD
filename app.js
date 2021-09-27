var express=require('express');
var app = express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
app.set('views','./views');
app.set('view engine','ejs');
mongoose.connect('mongodb://localhost:27017/cadcutilisateur');
var userSchema=new mongoose.Schema({
    cin:String,
    nom:String,
    email:String,
    gsm:String,
    adresse:String
});
var Utilisateurs = mongoose.model('Utilisateurs',userSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.render('adduser');
});
/*app.get('/add',function(req,res){
    res.render('adduser');
});*/
app.post('/insertion',function(req,res){
    var us={
        cin:req.body.cin,
        nom:req.body.nom,
        email:req.body.email,
        gsm:req.body.gsm,
        adresse:req.body.adresse
    };
    var donnee=new Utilisateurs(us);
    donnee.save();
    res.redirect('/result');
});
app.get('/result',function(req,res){
    Utilisateurs.find().then(function(users){
        res.render('list',{us:users});
    });
});
app.get('/edit/:id',function (req, res) {
   var id=req.params.id;
    Utilisateurs.findById(id, function (err, users){
    if(err){console.log(err)}
    else{
    console.log(users)
    res.render('update', {us: users})
    }
    })
    })
    app.post('/modify/:id',function (req, res) {
    var id = req.body.id
    console.log('id_user '+id)
    Utilisateurs.findById(id , function (err,users){
    if(err){console.log(err)}
    else{
        users.cin=req.body.cin
        users.nom=req.body.nom
        users.email=req.body.email
        users.gsm=req.body.gsm
        users.adresse=req.body.adresse
    users.save()
    res.redirect('/result')
    }
    })
    })
    
app.get('/result',function(req,res){
    Utilisateurs.find().then(function(users){
        res.render('list',{us:users});
    });
});
app.get('/delete/:id',function(req,res){
   Utilisateurs.findByIdAndRemove({_id:req.params.id},function(err,users){
       if(err) res.json(err);
       else{
           console.log('supprimé')
       }
     
   })
   Utilisateurs.find().then(function(users){
    res.render('list',{us:users})
})
})
app.get('/result',function(req,res){
    Utilisateurs.find().then(function(users){
        res.render('list',{us:users});
    });
});
app.listen(2021);