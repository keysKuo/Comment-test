const express = require('express'); // Function
const app = express();
const path = require('path');
const cors = require('cors');
const handlebars = require('express-handlebars'); // Template Engine Handlebars 
const cookie = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser");
const database = require('./config/database');
const { create_comment, add_child_comment, get_comments } = require('./apis/Comment');

database.connect();

const Account = require('./models/Account');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookie('SUD'));
app.use(session({ cookie: { maxAge: 30000000 } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {}
}));

app.set('views', path.join(__dirname, 'views/pages'));

let GET_loginController = (req, res, next) => {
    return res.render('login.hbs')
};

let POST_loginController = async (req, res, next) => {
    const { email, password } = req.body;

    let myAccount = await Account.findOne({email: email});

    if(!myAccount) {
        return res.json('Tài khoản k tồn tại');
    }
    else {
        if(myAccount.password == password) {
            return res.json(myAccount)
        }
        else {
            return res.json('Sai password');
        }
    }
}

// req => request client -> server 
// res => response server -> client

app.get('/', (req, res) => {
    return res.json('Trang chủ');
})

app.get('/login', GET_loginController);

app.post('/login', POST_loginController);

app.get('/register', (req, res) => {
    return res.render('register.hbs');
})

app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, confirm_password } = req.body;

    if(password != confirm_password) {
        return res.json('Password không trùng khớp');
    }

    let myAccount = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
    }

    await new Account(myAccount).save();
    return res.redirect('/login');
})

// Create a new Comment
app.post('/create_comment', async (req, res) => {
    const { content, user_id } = req.body;

    let myComment = await create_comment(content, user_id);
    return res.json(myComment);

})

 app.post('/add_child_comment', async (req, res) => {
    const { content, user_id, parent_id } = req.body;

    let myChildComment = await add_child_comment(content, user_id, parent_id);
    return res.json(myChildComment);
 })

app.get('/get_comment/:user_id', async (req, res) => {
    const { user_id } = req.params;

    let myComments = await get_comments(user_id);
    return res.json(myComments);
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})