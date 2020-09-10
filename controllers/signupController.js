
const db = require('../database');
const User = require('../models/User');
const userSchema = require('../validation');
const { cpf } = require('cpf-cnpj-validator');

exports.MostraCriarCadastro = (req, res) => {

    //renderizando o formulario de cadastro
    res.render('formulario-cadastro', 
        {
            pageTitle: "Novo Usuário",
            user: req.session.user
        });
}

exports.EnviaDadosCadastro = (req, res) => {

    // constantes do formulario body
    const name = req.body.name;
    const email = req.body.email;
    const bodycpf = req.body.cpf;
    const pass = req.body.pass;
    const isadmin = 0;

    //validação do formulario
    const val = userSchema.validate({username: name, email: email, password: pass});

    if(!name || !email || cpf.isValid(bodycpf) || !pass || !val == true){

        res.render('formulario-cadastro', {pageTitle: "Escola particular - Formulario",
        logado: req.session.loggedIn,
        user : req.session.user,
        erro: "Dados Faltando!"
        });
        
    }else{

    //criando um novo usuario
    let novoUser = new User(name, email, cpf.format(bodycpf), pass, isadmin);
    novoUser.salvarNoBanco().then(result => {
        
        //adicionando as informações do usuario no banco de dados
        let query1 = `SELECT * FROM users 
            WHERE email = `+db.escape(email)+` AND pass = `+db.escape(pass)+``;

            //redirecionando e fazendo o login automaticamente
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
                
                //retornando na area de login se der erro nos dados
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
    })
    .catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });
}
}