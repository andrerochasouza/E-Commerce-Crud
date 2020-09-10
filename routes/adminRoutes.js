const express = require('express');
const router = express.Router();

const ControleAdmin = require('./../controllers/adminController');

router.get('/add-prod', ControleAdmin.MostrarAddProd);

router.post('/add-product', ControleAdmin.AdicionarAulaAdmin);

router.get('/excluir/:id', ControleAdmin.ExcluirAula);

router.get('/excluiruser/:id', ControleAdmin.ExcluirUser);

router.get('/lista', ControleAdmin.ListaUsuarios);


module.exports = router;
