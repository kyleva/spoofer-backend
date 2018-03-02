const express = require("express"),
      router = express.Router(),
      SpoofController = require("../controllers/spoofer")


//default API message
router.get("/", (req, res)  => {
  res.json({ message: "hooray! welcome to our api!" })
})

//show all posts
router.get("/posts", SpoofController.list)

//Create Posts
router.post("/posts", SpoofController.create)

//single spoof item
router.get("/posts/:encoded_id", SpoofController.detail)

module.exports = router
