const deleteRoute = require("express").Router();
const itemsmodel = require("../models/itemsmodel")

deleteRoute.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});


deleteRoute.get("/:_id", async (req, res) => {
    await itemsmodel.deleteOne({_id:req.params._id})
    res.redirect("/painel")
})






module.exports = deleteRoute;