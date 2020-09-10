
//requerimentos necessarios para este CONTROLLER
const db = require('../database');

exports.MostraLogin = (req, res) => {
     
    //renderiza a pagina de login
    res.render('login', {pageTitle: "Escola Particular - Login",
        logado: req.session.loggedIn,
        user : req.session.user,
    })

}

//destroi a sessão que está na pagina
exports.Deslogar = (req, res) => {
    req.session.destroy();
    res.redirect('/');

}


exports.FazLogin = (req, res) => {

    //cria constantes e pega valores no formulario de login
    const email = req.body.email;
    const pass = req.body.pass;

    //faz um SELECT de usuarios e depois executa no banco de dados
    let query = `SELECT * FROM users 
        WHERE email = `+db.escape(email)+` AND pass = `+db.escape(pass)+``;

    //faz um EXECUTE no banco
    db.execute(query)
    .then(result => {

        //faz uma verificação de dados que é inseridos pelo usuario e depois faz um redirecionamento para o inicio da pagina
        if (result[0].length > 0) {
            req.session.user = result[0][0];
            req.session.loggedIn = true;
            if (result[0][0].isadmin) {
                req.session.isadmin = true;
                res.redirect('/');  
            } else {
                res.redirect('/');
            }

        } else {
            res.render('login', {pageTitle: "Escola particular - Login",
            logado: req.session.loggedIn,
            user : req.session.user,
            erro: "Dados não conferem"
        });
        }
    })
    .catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });

}