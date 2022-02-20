const { Router } = require('express');
const ProdutoController = require("../controllers/produtoController");
const router = Router();
const multer = require('../storage')

router.get('/produtos', ProdutoController.pgProdutos);
router.get('/produtos/novo', ProdutoController.pgAddProduto);
router.get('/produtos/editar/:id', ProdutoController.pgEditProduto);
router.post('/produtos/atualizar', multer.single('image'), ProdutoController.editProduto);
router.post('/produtos/enviar', multer.single('image'), ProdutoController.AddProduto); //multer aqui é um midleware
router.post('/produtos/deletar', ProdutoController.delProduto);
router.post('/produtos/aplicar-cupom', ProdutoController.aplicarCupom);

module.exports = router;