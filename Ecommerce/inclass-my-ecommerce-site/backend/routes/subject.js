const express = require ('express');
const router = express.Router(); //รันไฟล์ รับรีเครด
const subject = require('../data/contact_subject.json');

router.get('/',( req,res) => {
   res.json(subject);
    // res.end('{"contactSubject": ["General Enquiry","Class","Schedule","Intructor","Price","Oyher","t4444"]}');
});

module.exports = router;
//คืนกลับไไป


