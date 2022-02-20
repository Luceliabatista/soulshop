const Cupons = require('./../models/Cupons');

class CupomController{
    static async paginaCupons(req, res) {
        let query = {};
        const { nomeCupom } = req.query;

        if(nomeCupom) {
            query = {title: {$regex: `${nomeCupom}`, $options: "i"}};
        }

        const cupons = await Cupons.find(query).lean();
        res.render("cupons", { cupons, nomeCupom });
    }
    static async paginaAdicionarCupom(req, res){
        res.render("add_cupom");
    }
    static async addCupom(req, res){
        const {title, code, category, expDate } = req.body;
        const cupom = Cupons({ title, code, category, expDate });
        await cupom.save();

        res.redirect("/cupons");
    }
    //Deleta cupom pelo id
    static async deleteCupom(req, res) {
        const { _id } = req.body;
        await Cupons.findByIdAndDelete(_id);
        res.redirect("/cupons")
    }
    //Renderiza página para editar cupom especificado pelo id
    static async paginaEditCupom(req, res) {
        const { id } = req.params;
        const cupom = await Cupons.findById(id).lean();
        res.render("editar_cupom", { cupom });
    }
    //Atualiza informações do cupom especificado pelo id
    static async editCupom(req, res) {
        const { _id, title, code, category, expDate } = req.body;
        await Cupons.findByIdAndUpdate(_id, { title, code, category, expDate });
        res.redirect("/cupons");
    }
}

module.exports = CupomController;