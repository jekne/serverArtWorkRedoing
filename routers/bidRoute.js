const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Bid = require("../models/").bid;
const Artwork = require("../models/").artwork;
const router = new Router();

//GET ALL THE BIDS
//http GET :4000/bids
router.get("/", async (req, res, next) => {
  try {
    const getAllBids = await Bid.findAll();
    if (!getAllBids) {
      res.status(404).send("Something wrong happened");
    }
    res.status(200).send({ message: "All the Bids", getAllBids: getAllBids });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
