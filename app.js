const express = require("express")
const mongoose = require("mongoose")
const app = express();
const bodyParser = require('body-parser')
const registRoute = require("./routes/registrationRoute")
const deleteRoute = require("./routes/deleteRoute")
const updateRoute = require("./routes/updateRoute")
const handlebars = require("express-handlebars")
const itemsmodel = require("./models/itemsmodel")
const cors = require("cors")
global.AuthLogin = false;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//arquivos estáticos............................................
app.use('/', express.static("public"));

//handlebars config---------------------------------------------
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

//config-session---------------------------------------

const session = require('express-session')
const oneHour = 60000 * 60

app.use(session({
    secret: "f6a5f56as45d4a5s6d5asf32a123s451",
    saveUninitialized: true,
    cookie: { maxAge: oneHour },
    resave: true
}))

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas...........................................

app.get("/", (req, res) => {

    if (req.session.AuthLogin) {
        return res.render("pages/postvst.handlebars");
    } else {
        res.render("pages/loginadmin.handlebars")
    }
})

app.post("/login", (req, res) => {
    if (req.body.adminname == "mactavish" && req.body.adminpass == "1234") {
        res.render("pages/postvst.handlebars")
        AuthLogin = true;
        req.session.AuthLogin = AuthLogin;
        return
    } else {
        return res.send("credenciais inválidas")
    }
})

app.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

app.get("/", (req, res) => {
    res.send("ok")
})

app.get("/painel", async (req, res) => {
    if (!req.session.AuthLogin) {
        return res.redirect("/")
    }

    let postlist = await itemsmodel.find().skip(0).sort({ _id: -1 });
    res.render("pages/painelposts.handlebars", { postlist })
})

app.get("/painelaxiossearch", async (req, res) => {
    let postlist = await itemsmodel.find().skip(0).sort({ _id: -1 });
    res.send(postlist)
})

app.post("/painelaxios", async (req, res) => {
    let limitbody = req.body.postLimit;
    let skipbody = req.body.postSkip;
    let postlist = await itemsmodel.find().sort({ _id: -1 }).limit(limitbody).skip(skipbody);
    let postlistsize = await itemsmodel.find().count();

    res.send({
        postlist: postlist,
        size: postlistsize
    })
})

app.get("/itemsearch/:id", async (req, res) => {

    try {
        let itemsearch = await itemsmodel.findOne({ _id: req.params.id })
        res.send(itemsearch)
    } catch (error) {
        console.log(error.msg);
    }

})

app.get("/itemssearchdaw", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "DAWS" })
    res.send(itemsearch)
})

app.get("/itemssearchpianos", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Pianos" })
    res.send(itemsearch)
})

app.get("/itemssearchdrums", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Drums-kit" })
    res.send(itemsearch)
})

app.get("/itemssearchorchestra", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Orchestra" })
    res.send(itemsearch)
})

app.get("/itemssearchkontakt", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Kontakt" })
    res.send(itemsearch)
})

app.get("/itemssearchguitar", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Guitar-Fx" })
    res.send(itemsearch)
})

app.get("/itemssearchplugins", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Pluguins" })
    res.send(itemsearch)
})

app.get("/itemssearchacoustic", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Acoustic-Guitar" })
    res.send(itemsearch)
})

app.get("/itemssearchbass", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Bass" })
    res.send(itemsearch)
})

app.get("/itemssearchworldmusic", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "World-Music" })
    res.send(itemsearch)
})

app.get("/itemssearchpercussion", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "Percussion" })
    res.send(itemsearch)
})

app.get("/itemssearchsynth", async (req, res) => {
    let itemsearch = await itemsmodel.find({ categories: "SYNTH" })
    res.send(itemsearch)
})

app.get("/itemssearchwindows", async (req, res) => {
    let itemsearch = await itemsmodel.find({ osSystem: "windows" })
    res.send(itemsearch)
})

app.get("/itemssearchmac", async (req, res) => {
    let itemsearch = await itemsmodel.find({ osSystem: "mac" })
    res.send(itemsearch)
})

app.get("/itemssearchlinux", async (req, res) => {
    let itemsearch = await itemsmodel.find({ osSystem: "linux" })
    res.send(itemsearch)
})


app.use("/registration", registRoute)
app.use("/delete", deleteRoute)
app.use("/update", updateRoute)


//mongodb-connect..............................................................................................................................
mongoose.connect("mongodb+srv://daniel:RyjCAgsMfT7huCde@cluster-vsts.ev25mse.mongodb.net/vstdatabase?retryWrites=true&w=majority").then(() => {
    console.log("conectado ao banco de dados com sucesso");
}).catch((err) => {
    console.log(err);
})



const port = process.env.PORT || 5120;
app.listen(port, () => {
    console.log("conectado ao servidor com sucesso PORTA: ", port);
})




