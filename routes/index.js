const {Router} = require('express');
const produtosRouter = require('./produtosRoutes');
const cuponsRouter = require('./cuponsRoutes');

const router = Router();

router.get('/', (req, res)=>{
    res.render('home');
});

router.use(produtosRouter);
router.use(cuponsRouter);

router.use((req, res, next)=>{
    res.render("404")
})

module.exports = router;