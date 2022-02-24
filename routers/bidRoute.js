const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Bid = require("../models/").bid;
const Artwork = require("../models/").artwork;
const User = require("../models/").user;
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

// create a new story:
//http -v POST :4000/bids/4 amount=111 email=g@g.com

router.put("/:artworkId", authMiddleware, async (req, res, next) => {
  try {
    // HERE WE GET OUT THE ID OF THE USER THAT MADE THE TOKEN
    const logged_in_user = req.user;

    console.log("THIS IS THE LOGGED_IN_USER", logged_in_user);
    const { amount } = req.body;

    const artworkId = parseInt(req.params.artworkId);

    console.log("my id", artworkId);
    if (!amount) {
      return res.status(404).send("Need to provided a amount for the Bid");
    }
    if (!logged_in_user.email) {
      return res.status(404).send("Need to provided a Email for the Bid");
    }
    const checkartworkId = await Bid.findByPk(artworkId);
    if (!checkartworkId) {
      return res.status(404).send("This Bid id do not belong a valid Artwork");
    }

    // Get all the bids, check the highest one, if the new one is not higher then that return an error
    const createBid = await Bid.create({
      amount,
      email: logged_in_user.email,
      artworkId,
    });

    if (!createBid) {
      return res.status(404).send("Something get wrong");
    }

    return res.status(200).send({
      message: `The new Bid with the artworkI ${artworkId} and whit the amount ${amount}  was create`,
      createBid,
    });
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
