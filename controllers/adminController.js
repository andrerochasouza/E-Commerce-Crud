
//requerimentos necessarios para este CONTROLLER
const db = require('../database');
const Product = require('../models/Product');


exports.MostrarAddProd = (req, res) =>{

    //verificando se é admin
    if (req.session.isadmin) {  

        //renderizando a pagina de adicionar aula
        res.render('add-prod', {
            pageTitle: "Escola Particular - Adicionar Produto",
            logado: req.session.loggedIn,
            user : req.session.user
        });
    };
};

exports.AdicionarAulaAdmin = (req, res) => {
    
    //verificando se é admin
    if (req.session.isadmin) {

    //criando as contantes e pegando os valores nos body do formulario de adicionar aula
    const nome = req.body.nomeAula;
    const materia = req.body.materiaAula;
    const professor = req.body.professorAula;
    const preco = req.body.precoAula;
    const image = req.body.imageAula;

      
        //criando uma nova aula e chamando um método no model Product
        let aula = new Product(nome, materia, professor, preco, image);
        aula.adicionarAula().then(result => {
                res.redirect('/');
            })
            .catch(erro => {
                console.log(erro);
                res.write(JSON.stringify(erro));
                res.end();
            });
        }
 };

exports.ExcluirAula = (req, res) => {

    //verificando se é admin
    if (req.session.isadmin) {

        //criando constante e pegando o valor na URL = id da aula
        const idAula = req.params.id;

            //fazendo um DELETE = excluindo uma aula e depois redirecionando para o inicio
            let excluir = `DELETE FROM aulas WHERE id = `+ db.escape(idAula)+``;
            db.execute(excluir).then(result => {

                    res.redirect('/');
                    
            })
            .catch(erro => {
                console.log(erro);
                res.write(JSON.stringify(erro));
                res.end();
            });
        };
};

exports.ExcluirUser = (req, res) => {

    //verificando se é admin
    if (req.session.isadmin) {

        //criando constante e pegando o valor na URL = id do usuario
        const idUser = req.params.id;

            //fazendo um DELETE = excluindo um usuario e voltando para a pagina de listagem de usuarios
            let excluir = `DELETE FROM users WHERE id = `+ db.escape(idUser)+``;
            db.execute(excluir).then(result => {

                //fazendo um SELECT de usuarios e depois redenrizando a pagina de lista de usuarios
                let listagem = `SELECT * FROM users WHERE isadmin = 0`;
                db.execute(listagem).then(result => {
                    res.render('lista', {
                        pageTitle: "Escola Particular",
                        users: result[0],
                        logado: req.session.loggedIn,
                        user : req.session.user})
                    }).catch(erro => {
                        console.log(erro);
                        res.write(JSON.stringify(erro));
                        res.end();
                    });
            }).catch(erro => {
                console.log(erro);
                res.write(JSON.stringify(erro));
                res.end();
            });
        };
};

exports.ListaUsuarios = (req, res) => {

    //verificando se é admin
    if (req.session.isadmin) {

        //fazendo um SELECT de usuarios e depois redenrizando a pagina de lista de usuarios
        let listagem = `SELECT * FROM users WHERE isadmin = 0`;
        db.execute(listagem).then(result => {
            res.render('lista', {
                pageTitle: "Escola Particular",
                users: result[0],
                logado: req.session.loggedIn,
                user : req.session.user})

        }).catch(erro => {
            console.log(erro);
            res.write(JSON.stringify(erro));
            res.end();
        });
    }
};