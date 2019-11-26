const express = require('express');
const app = express();
const db = require('./mysqldb');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
    console.log('listining ...');
});

app.get('/', (req, res) => {
    res.render('one', {
        name: 'vamshi',
        city: 'Adilabad'
    });
});

app.get('/cars', (req, res) => {
    let sql = 'select* from cartable';
    db.execute(sql).then(([rows, fileds]) => {
        res.render('showCars', {
            cars: rows
        });
    });

});
app.get('/search', (req, res) => {
    res.render('search');
});
app.post('/findcar', (req, res) => {
    let carId = req.body.carid;
    let sql = 'select * from cartable where id = ?';
    db.execute(sql, [carId]).then(([rows, fileds]) => {
        res.render('showonecar', {
            cars: rows
        });
    });
});
app.get('/insertCar',(req,res)=>{
    res.render('insertCar');
})
app.post('/insert',(req,res) => {
    let id =  req.body.carid;
    let make = req.body.make;
    let model = req.body.model;
    let variant = req.body.variant;
    
    let sql = "insert into cartable(id,make,model,variant) values('" +id + "', '" + make + "', '" + model + "', '" + variant +"')";
    db.execute(sql,(err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
});
