
const express = require('express');
const router = express.Router();


const Controle = require('./../controllers/userController');
const ControleLogin = require('./../controllers/loginController');
const ControleCadastro = require('./../controllers/signupController');
const ControleTrocar = require('./../controllers/trocaNomeSenha');


router.get('/', Controle.MostraPaginaInicial);
router.get('/detalhar/:id', Controle.Detalhar);

router.get('/carrinho/:id', Controle.MostraPaginaCarrinho);
router.get('/carrinho/adicionar/:id', Controle.AdicionarCarrinho);
router.get('/carrinho/retirar/:id', Controle.RetirarCarrinho);

router.get('/login', ControleLogin.MostraLogin);
router.post('/login', ControleLogin.FazLogin);

router.get('/deslogar', ControleLogin.Deslogar);

router.get('/trocarnome', ControleTrocar.MostraNome);
router.post('/trocarnome', ControleTrocar.TrocaNome);
router.get('/trocarsenha', ControleTrocar.MostraSenha);
router.post('/trocarsenha', ControleTrocar.TrocaSenha);

router.get('/new-user', ControleCadastro.MostraCriarCadastro);
router.post('/new-user-form', ControleCadastro.EnviaDadosCadastro);

module.exports = router;
