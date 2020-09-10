
const User = require('../models/User');
const db = require('../database');


exports.MostraNome = (req, res) => {
     
    res.render('trocar-nome', {pageTitle: "Escola Particular - Trocar Nome",
        logado: req.session.loggedIn,
        user : req.session.user,
    })

}
exports.MostraSenha = (req, res) => {
     
    res.render('trocar-senha', {pageTitle: "Escola Particular - Trocar Senha",
        logado: req.session.loggedIn,
        user : req.session.user,
    })

}

exports.TrocaNome = (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;

    let novoUser = new User(name, email, req.session.cpf, pass, req.session.isadmin);
        novoUser.trocarNome().then(result => {

            let query1 = `SELECT * FROM users 
            WHERE email = `+db.escape(email)+` AND pass = `+db.escape(pass)+``;

            db.execute(query1)
            .then(result => {
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
                    res.render('trocar-nome', {pageTitle: "Escola particular - Trocar Senha",
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
        })
        .catch(erro => {
            console.log(erro);
            res.write(JSON.stringify(erro));
            res.end();
        });
}

exports.TrocaSenha = (req, res) => {

   
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;

    let novoUser = new User(name, email, req.session.cpf, pass, req.session.isadmin);
    novoUser.trocarSenha().then(result => {

            let query1 = `SELECT * FROM users 
            WHERE email = `+db.escape(email)+` AND pass = `+db.escape(pass)+``;

            db.execute(query1)
            .then(result => {
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
                    res.render('trocar-senha', {pageTitle: "Escola particular - Trocar Senha",
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
    })
    .catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });
}