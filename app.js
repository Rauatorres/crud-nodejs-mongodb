const express = require("express")
const consign = require("consign")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "app/view")

app.use(express.static("app/public"))

consign().
    include("app/routes").
    then("app/model").
    then("app/controller").
    into(app)

app.listen(80, () => {
    console.log("Server succesfully started! Listening on http://localhost")
})