const express = require('express');
const app = express();

app.listen(3000,() =>{
    console.log("server is up :3000")
});
app.use((req,res,next)=>{
   next();
});
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
//app.use(express.static(__dirname+'/css'));
//app.use(express.static(__dirname+'/images'));
app.get('/',(req,res) =>{
    res.send('<h2>Wlcome to Hyderabad</h2>');
});
app.post('/login',(req,res) =>{
  let uname = req.body.uname;
  let pass = req.body.pass;
  if(uname == "vamshi" && pass=="1234"){
      res.send("Welcome!!");
  }else{
      res.redirect('login.html');
  }
});
app.get('/kiran',(req,res) =>{
   // res.setHeader('<h2>Wlcome to kiran</h2>');
    res.send('<h2>Hello : ' + req.query.name + '</h2>');
});
app.get('/greet/:name/:city',(req,res) =>{
    res.send('<h2>Hello  ' + req.params.name +" from "+req.params.city + '</h2>');
});
app.use((req,res,next)=>{
    res.send(404,'<h3>File Not Found</h3>');
    next();
});