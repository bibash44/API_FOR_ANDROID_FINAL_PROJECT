const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { objectId } = require('mongodb');
const path = require('path')
const multer = require('multer')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

require('./DB_CONNECTION/DB_CONNECTION');
const user = require('./MODELS/user');



app.post('/insert_user', function (req, res) {
    var Useremail = req.body.email;
    var fullname = req.body.fullname;
    var phone = req.body.phone;
    var password = req.body.password;

    user.findOne({
        email: Useremail
    }).then(function (result) {

        if (result == null) {

            var ADD_NEW_USER = new user({
                fullname: fullname,
                email: Useremail,
                phone: phone,
                password: password
            })

            console.log(fullname)

            ADD_NEW_USER.save().then(function () {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    registered: true
                }, null, 3));
            }).catch(function () {
                console.log('Failed')
            })

        }

        else {

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                registered: false
            }, null, 3));

        }

    })

})


app.listen(80);