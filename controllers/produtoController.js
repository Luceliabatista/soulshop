const Produto = require("../models/Produtos");
const Cupons = require("./../models/Cupons");

class ProdutoController {
    static async pgProdutos(req, res) {
        let query = {};
        const { nomeProduto } = req.query;

        if (nomeProduto) {
            query = { name: { $regex: `^${nomeProduto}`, $options: "i" } };
        }

        if (!req._parsedUrl.search) {
            query = {}
        }

        const produtos = await Produto.find(query).lean();
        res.render("produtos", { produtos, nomeProduto })
    }
    static async pgAddProduto(req, res) {
        res.render("add_produto")
    }
    static async AddProduto(req, res) {
        const { name, price, description, quantity, kind } = req.body;
        const image = req.file?.publicUrl;
        const produto = Produto({ name, price, description, quantity, kind, image });
        await produto.save();
        res.redirect('/produtos');
    }

    static async pgEditProduto(req, res) {
        const { id } = req.params;
        const produto = await Produto.findById(id).lean();
        res.render('editar_produto', { produto });
    }

    static async editProduto(req, res) {
        const { id, name, price, description, quantity } = req.body;
        const file = req.file;

        await Produto.findByIdAndUpdate(id, {
            name,
            price,
            description,
            quantity,
            image: file?.publicUrl,
        });

        res.redirect("/produtos");
    }

    static async delProduto(req, res) {
        const { _id } = req.body;
        await Produto.findByIdAndDelete(_id);
        res.redirect('/produtos');
    }

    static async aplicarCupom(req, res) {
        const { cupom, produtoId } = req.body;
        const cupomVerify = await Cupons.find({ code: cupom });
        const produto = await Produto.findById(produtoId).lean();
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        try {
            if (cupomVerify[0] && cupomVerify[0].category === produto.kind) {
                const cupomValidDay = new Date(`${cupomVerify[0].expDate} `).getDate();
                const cupomValidMonth = new Date(`${cupomVerify[0].expDate} `).getMonth() + 1;
                const cupomValidYear = new Date(`${cupomVerify[0].expDate} `).getFullYear();


                if ((cupomValidYear >= currentYear)) {
                    if ((cupomValidMonth > currentMonth)) {
                        await Produto.findByIdAndUpdate(produto._id,
                            {
                                price: (produto.price - Number(cupomVerify[0].code.split('-')[1]))
                            }
                        )
                    } else if ((cupomValidMonth == currentMonth)) {
                        if ((cupomValidDay >= currentDay)) {
                            await Produto.findByIdAndUpdate(produto._id,
                                {
                                    price: (produto.price - Number(cupomVerify[0].code.split('-')[1]))
                                }
                            )
                        } else {
                            throw new Error('Dia do cupom expirado');
                        }
                    } else {
                        throw new Error('Mês do cupom expirado');
                    }
                } else {
                    throw new Error('Ano do cupom expirado');
                }
            } else {
                throw new Error('Cupom inválido');
            }
        } catch (err) {
            console.error(err);
        }

        res.redirect('/produtos');
    }
}

module.exports = ProdutoController;