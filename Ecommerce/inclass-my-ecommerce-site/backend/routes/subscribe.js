const express = require('express');
const router = express.Router();


const fs = require('fs');
const path = require('path');

/*
1. อ่านไฟล์
2.นำข้อมูลไปใส่ในอาเร
3.เพิ่มลงในอาเร
4.บันทึก อาเรรลงในไฟล์
*/

router.post('/', (req, res) => {
    const { email } = req.body
    const subscribe = { subscribeAt: new Date(), email };


    const filePath = path.join(__dirname, '..', 'data', 'subscribe.json')
    console.log('Content form submited', { email });

    let subscribes = [];

    if (fs.existsSync(filePath)) {
        //file is there
        const filedata = fs.readFileSync(filePath, 'utf-8')
        subscribes.push(JSON.parse(filedata)); //push ลืม

        subscribes.push(subscribe);
        fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
        res.status(200).json({ status: "Message Recieved" });
        console.log('Content form submitted', { email });
    } else {
        // no file
        subscribes.push(subscribe);
        fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
        res.status(200).json({ status: "Message Recieved" });
        console.log('Content form submited', { email });

    }

    // res.status(200).json({status:"Message Recieved"});
});

module.exports = router;