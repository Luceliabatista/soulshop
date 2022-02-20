const { Router } = require('express');
const CupomController = require('../controllers/CupomController');

const router = Router();

router.get('/cupons', CupomController.paginaCupons);
router.get('/cupons/novo', CupomController.paginaAdicionarCupom);
router.post('/cupons/enviar', CupomController.addCupom);
router.get('/cupons/editar/:id', CupomController.paginaEditCupom);
router.post("/cupons/atualizar", CupomController.editCupom);
router.post("/cupons/deletar", CupomController.deleteCupom);

module.exports = router;