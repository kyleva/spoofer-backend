const express = require("express")
const router = express.Router()
const SpoofItem = require("../models/spoofitem")
const proxy = require("http-proxy-middleware")
const IndexController = require("../controllers/index")


router.get("/:encoded_id", IndexController.detail)

router.get("/", IndexController.home)

module.exports = router
