const express = require ('express');
const router = express.Router(); //รันไฟล์ รับรีเครด


router.post('/',( req,res) => {
    const {fname,lname,email,subject,message} = req.body
    console.log('Content from submited', {fname,lname,email,subject,message} );
    res.status(200).json({status:"Message Recieved"});
    //res.end('{"contactSubject": ["General Enquiry","Class","Schedule","Intructor","Price","Oyher","t4444"]}');
});

module.exports = router;