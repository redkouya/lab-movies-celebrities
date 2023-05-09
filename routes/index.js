const router = require("express").Router();
const routerCeleb=require("./celebrities.routes.js")
const routerMovie=require("./movies.routes.js")
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.use("/celebrities",routerCeleb)
router.use("/movies",routerMovie)
module.exports = router;
