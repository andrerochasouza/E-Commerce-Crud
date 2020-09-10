const Product = require('../models/Product');
const User = require('../models/User');
const db = require('../database');

exports.MostraPaginaCarrinho = (req, res) => {

    const idUser = req.session.user.id;

    let query = `SELECT * FROM carrinho INNER JOIN aulas WHERE carrinho.idaulas = aulas.id and idusers = `+db.escape(idUser)+``;
                db.execute(query)
                    .then(result => {
                        res.render('carrinho', {
                            pageTitle: "Escola Particular - Carrinho",
                            product: result[0][0],
                            prods: result[0],
                            logado: req.session.loggedIn,
                            user : req.session.user})
                    })
                    .catch(erro => {
                        console.log(erro);
                        res.write(JSON.stringify(erro));
                        res.end();
                    });
}

exports.AdicionarCarrinho = (req, res) => {
    
    const idAula = req.params.id;
    const idUser = req.session.user.id;

    let query = `INSERT INTO carrinho (idaulas, idusers) VALUES (`+ db.escape(idAula) +`, `+ db.escape(idUser) +`)`;

        db.execute(query)
        .then(result => {
            let query = `SELECT * FROM carrinho INNER JOIN aulas WHERE carrinho.idaulas = aulas.id and idusers = `+ db.escape(idUser) +``;
                db.execute(query)
                    .then(result => {
                        res.render('carrinho', {
                            pageTitle: "Escola Particular - Carrinho",
                            product: [0][0],
                            prods: result[0],
                            logado: req.session.loggedIn,
                            user : req.session.user})
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

exports.RetirarCarrinho = (req, res) => {

    const idAula = req.params.id;

    let query = `DELETE FROM carrinho WHERE idaulas = `+db.escape(idAula)+``;

        db.execute(query)
        .then(result => {
            res.redirect('/');
        })
        .catch(erro => {
            console.log(erro);
            res.write(JSON.stringify(erro));
            res.end();
        });
}

exports.MostraPaginaInicial = (req, res) => {
    
    console.log(req.session);


        let query = `SELECT * FROM aulas`;
    
        db.execute(query)
        .then(result => {
            res.render('todos', {
                pageTitle: "Escola Particular",
                prods: result[0],
                logado: req.session.loggedIn,
                user : req.session.user})
        })
        .catch(erro => {
            console.log(erro);
            res.write(JSON.stringify(erro));
            res.end();
        });

}



exports.Detalhar = (req, res) => {

    const idAula = req.params.id;

    let buscar = `SELECT * FROM aulas WHERE id = `+idAula+``;
    db.execute(buscar)
    .then(result => {
        res.render('detalhar', 
        {
            pageTitle: "Escola Particular - Detalhe",
            product: result[0][0],
            logado: req.session.loggedIn,
            user : req.session.user
        });
    })
    .catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });
}
