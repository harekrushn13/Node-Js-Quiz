const express = require("express");
const { asyncRouteHandler } = require("../utils/router-utils");
const {
  getQuestions,
  evaluateQuiz,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", (req, res) => res.render("./start-quiz"));
router.get("/quiz", (req, res) => res.render("./quiz"));
router.get("/result", (req, res) => res.render("./result"));
router.get("/question", asyncRouteHandler(getQuestions));
router.post("/evaluate", asyncRouteHandler(evaluateQuiz));

module.exports = router;