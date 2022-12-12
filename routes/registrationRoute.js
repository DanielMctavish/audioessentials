const registRoute = require("express").Router();
const itemsmodel = require("../models/itemsmodel")



registRoute.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});

registRoute.post("/", async (req, res) => {
    if (!req.session.AuthLogin) {
        return res.redirect("/")
    }


    let data = new Date().toLocaleDateString();
    let dateString = data.toString()
    await itemsmodel.create({
        name: req.body.vstname,
        descri: req.body.vstdescribe,
        img: req.body.vsturlimg,
        link: req.body.vstlink,
        categories: req.body.categorievst,
        osSystem: req.body.osSystem,
        dateSet: dateString
    }).then(() => {
        console.log("item criado com sucesso");
    })

    res.redirect("/")
})


module.exports = registRoute;