const express = require('express')
const {spawn} = require('child_process');
const { stringify } = require('querystring');
var bodyParser = require('body-parser')
const mysql = require('mysql')


const app = express()
const port = 4000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

var sql = '';

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: "123570123570",
    database: 'threader',
})

db.connect((err)=>{
    if(err){ 
        console.log(err)
        console.error("Error on db connect");
    }
    else{
        console.log('MySQL connected'); 
    }
})


app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.post('/api/addRating', (req, res)=>{
    var data = req.body;

    console.log('Following query received:\n' + data.sql)

    db.query(data.sql, function (err, result) {
        if (err){
            console.log(err)
            console.log('Error in SQL Query')
            console.log('-> ' + data.sql);
            res.send(err)
        }   
        else{         
        console.log("Executed following SQL query:");
        console.log('-> ' + data.sql);
        res.send(result)
        }
      });
})



app.post('/api/analyze', (req, res)=>{ 
    var data = req.body;
    const python = spawn('python', ['../MachineLearning/SA.py', data['statement']]);

    console.log("Statement Received: " +  data['statement'])

    python.stdout.on('data', function (data_) {
            console.log('Pipe data from python SA script ...');
            // console.log(data_.toString())
            res.send(data_.toString())
        });
    
})

app.post('/api/pp', (req, res)=>{ 
    var data = req.body;
    const python = spawn('python', ['../MachineLearning/PP.py', data['response'], data['code']]);

    console.log('List of response received ...')
    console.log('Code: ' + data['code'])

    python.stdout.on('data', function (data_) {
            console.log('Pipe data from python PP script ...');
            // console.log(data_.toString())
            res.send(data_.toString())
        });
    
})
app.listen(port, () => console.log(`Example app listening on port ${port} !`))