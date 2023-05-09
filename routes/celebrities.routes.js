const express = require("express");
const router = express.Router();

const Celeb = require("../models/Celebrity.model");

//* GET "/celebrities/create" => formulario de crear famosos
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//* POST "/celebrities/create" => recibe datos del formulario crear famosos
router.post("/create", (req, res, next) => {
  //console.log(req.body)

  const { name, occupation, catchPhrase } = req.body;
  Celeb.create({
    name,
    occupation,
    catchPhrase,
  })
    .then(() => {
      console.log("Famos@ añadido");
      res.redirect("/")
    })
    .catch((err) => {
      next(err);
    });
});

//* GET "/celebrities/celebrities" => lista todas las celebridades de la BD
router.get("/celebrities",async (req,res,next)=>{
    try{
        const allCelebs= await Celeb.find()
        //console.log(allCelebs)
        res.render("celebrities/celebrities",{allCelebs})

    }
    catch(error)
    {
        next(error)
    }
   
})

//* GET "/celebrities/:id"

router.get("/:id",(req,res,next)=>{

  Celeb.findById(req.params.id)
  .then((oneCeleb)=>{
    res.render("celebrities/celebritie-details",oneCeleb)

  })
  .catch((err)=>{
    next(err)
  })
})
module.exports = router;
