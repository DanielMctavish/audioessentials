const updateRoute = require("express").Router();
const itemsmodel = require("../models/itemsmodel")

global.current_id = ""

updateRoute.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});

updateRoute.get("/:id", async (req, res) => {
    if (!req.session.AuthLogin) {
        return res.redirect("/")
    }

    current_id = req.params.id;
    let current_post = await itemsmodel.findOne({ _id: current_id })

    res.render("pages/updatePost", { current_post })
})

updateRoute.post("/", async (req, res) => {
    if (!req.session.AuthLogin) {
        return res.redirect("/")
    }
    await itemsmodel.findOneAndUpdate({ _id: current_id }, {
        name: req.body.name,
        categories: req.body.categoriesupdate,
        descri: req.body.descriupdate,
        img: req.body.imgupdate,
        link: req.body.linkupdate,
        osSystem: req.body.osSystem
    }, { new: true }).then(() => {
        console.log("o item foi atualizado com sucesso.");
        res.redirect("/")
    }).catch(err => {
        console.log("houve um erro ao tentar atualizar o post", err);
        res.redirect("/")
    })
})

module.exports = updateRoute;