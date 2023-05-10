const mongoose = require("mongoose");

const celebSchema=new mongoose.Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String,
        selected:Boolean // para poder añadirlo y ser seleccionado en el select box
    }
)

const Celeb=mongoose.model("Celeb",celebSchema)
module.exports=Celeb
