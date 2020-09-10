
//Requerimentos para funcionamento inteiro do crud
const express = require('express');
const bodyparser = require('body-parser');  
const cookieparser = require('cookie-parser');
const session = require('express-session');
const app = express();

//criando a sessão
app.use(session({
    secret: 'IUESAHDAIUFNHAIFNAFOISNFF1@$#!#¨$&$&$@%#%#3218746149816491873468',
    resave: false,
    saveUninitialized: false
}));

//setando as views, ejs, bodyparser, cookie-parser e express
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use(express.static('public'));
app.use('/data', express.static('data'));
app.use('/uploads', express.static('uploads'));

//redirecionamento de rotas = userRoutes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

//redirecionamento de rotas = adminRoutes
const isAdmin = (req, res, next) => {
    console.log("Verificando se é admin...");
    if (req.session.isadmin) {
        next();
    } else {
        res.redirect('/login');
    }

}

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', isAdmin, adminRoutes);

//redirecionamento do url quando não há nenhum link pedido
app.use((req, res) => {
    res.status(404);
    res.write("Pagina não existe!");
    res.end();
});

//Escuta na porta 3000
app.listen(3000);
