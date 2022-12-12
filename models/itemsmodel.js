const mongoose = require("mongoose");


const itemsSchema = new mongoose.Schema({
    name: String,
    descri: String,
    img: String,
    link: String,
    categories: String,
    osSystem: String,
    dateSet:  String
})

module.exports = mongoose.model("itemspost", itemsSchema)