const express = require('express');
const bodyParser = require('body-parser');
const { check , validationResult } = require('express-validator');

const app = express();

app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', 
urlencodedParser, 
[ check('username', 'username must be not empty and atleast 3 charactors long')
    .exists()
    .isLength({ min: 3 }),
  check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail(),

], 

(req, res) => {
   const errors = validationResult(req);

   if(!errors.isEmpty()) {
    //res.json(req.body);
    //return res.status(422).jsonp(errors.array());

    const alert = errors.array();

    res.render('register', {
        alert
    })
   }
});

const port = 3000;
app.listen(port, () => {
    console.log('listening to requests at port ' + port);
});

// timestamp [ 12.32 ]

