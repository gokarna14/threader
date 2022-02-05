const express = require('express')
const {spawn} = require('child_process');
const { stringify } = require('querystring');
const app = express()
const port = 4000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/api/analyze', (req, res)=>{ 
    var data = req.body;
    const python = spawn('python', ['../MachineLearning/SA.py', data['statement']]);

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
// '../MachineLearning/SA.py'

// app.get('/', (req, res) => {
//     var dataToSend;
//     // spawn new child process to call the python script
//     const python = spawn('python', ['script1.py', 'FUCK']);
//     // collect data from script
//     python.stdout.on('data', function (data) {
//         console.log('Pipe data from python script ...');
//         dataToSend = data.toString();
//         });
//     // in close event we are sure that stream from child process is closed
//     python.on('close', (code) => {
//         console.log(`child process close all stdio with code ${code}`);
//         // send data to browser
//         res.send(dataToSend)
//         });
// })

app.listen(port, () => console.log(`Example app listening on port ${port} !`))