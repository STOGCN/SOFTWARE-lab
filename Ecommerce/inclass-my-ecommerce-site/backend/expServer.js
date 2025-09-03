const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');

const app  = express ();
const PORT = 4000 ;

app.use(cors());
app.use(bodyParser.json()); //รับข้อมูลมาแบบjson 


app.use('/api/subject',require('./routes/subject')); ///api/subject require ไปที่ไฟล์นั้นๆ
app.use('/api/contact',require('./routes/contact'));  ///api/contact require ไปที่ไฟล์นั้นๆ
app.use('/api/subscribe',require('./routes/subscribe'));


app.listen (PORT,() =>{
console.log('Server running at http://localhost:'+PORT);

});
//ฝังพอด 





