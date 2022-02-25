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
    const artworkForBid = await Artwork.findByPk(artworkId, { include: [Bid] });
    if (!artworkForBid) {
      return res.status(404).send("This artwork does not exist");
    }

    // Get all the bids, check the highest one, if the new one is not higher then that return an error
    // Get all the bids(for this artwork) from the database (.findall)
    const allTheBidsFromThisArtwork = artworkForBid.bids;

    // You now have array of all the bids
    // Map over every 'Bid object'into the bid amoun bids.map(bid => bid.amount), you now have an array of amounts (numbers)
    const bidAmounts = allTheBidsFromThisArtwork.map((bid) => {
      return bid.amount;
    });
    // console.log(bidAmounts);
    // console.log(Math.max(...[1, 2, 3, 4]));
    // res.send("okay!");

    // // to get the maximum value out of that list, you can use Math.max(...array)
    const getTheHigherBid = Math.max(...bidAmounts);
    console.log("my higher bid", getTheHigherBid);
    // // check if the current bid is higher then the result of Math.max
    if (amount < getTheHigherBid) {
      res.status(400).send("THE BID NEED TO BE GREATER THAN THE LAST VALUE!!!");
    } else {
      try {
        const createBid = await Bid.create({
          amount,
          email: logged_in_user.email,
          artworkId,
        });
        return res.send({
          message: `The new Bid with the artworkId ${artworkId} and with the amount ${amount} was created`,
          bid: createBid,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
      }
    }
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
